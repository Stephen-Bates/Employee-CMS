import inquirer from 'inquirer';
import { db } from './connection.js';
import { queries } from '../utils/queries.js';
import AsciiTable from 'ascii-table';

const actionPrompt = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do:',
        choices: [
            //TODO: change these into objects with values that are functions to be run after selection
            { name: 'View all departments', value: showAllDepartments },
            { name: 'View all roles', value: showAllRoles },
            { name: 'View all employees', value: showAllEmployees },
            { name: 'Add a department', value: addDepartment },
            { name: 'Add a role', value: addRole },
            { name: 'Add employee', value: addEmployee },
            { name: 'Update an employee', value: updateEmployee }
            // { name: 'Quit', value: quit }
        ]
    })
        .then(response => response.action());
}

const showAllDepartments = () => {
    db.query(queries.get_departments, (err, result) => {
        if (err) {
            console.log(err);
        }

        const table = new AsciiTable("Departments");
        table.setHeading('id', 'name')
        result.map(department => table.addRow(department.id, department.name))
        console.log(table.toString());
        return actionPrompt();
    });
}

const showAllRoles = () => {
    db.query(queries.get_roles, (err, result) => {
        if (err) {
            console.log(err);
        }

        const table = new AsciiTable("Departments");
        table.setHeading('id', 'title', 'salary', 'department')
        result.map(role => table.addRow(role.id, role.title, role.salary, role.department))
        console.log(table.toString());
        return actionPrompt();
    });
}

const showAllEmployees = () => {
    db.query(queries.get_employees, (err, result) => {
        if (err) {
            console.log(err);
        }

        const table = new AsciiTable("Employees");
        table.setHeading('id', 'first name', 'last name', 'title', 'department', 'salary', 'manager')
        result.map(employee => table.addRow(employee.id, employee.first_name, employee.last_name, employee.title, employee.department, employee.salary, employee.manager))
        console.log(table.toString());
        return actionPrompt();
    });
}

const addDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?:'
        },
    ).then(response => {
        if (!response.name) {
            console.log("Missing information, No department added, returning to selections");
            return actionPrompt();
        }
        db.query(queries.add_department(response), (err, result) => {
            if (err) {
                switch (err.errno) {
                    case 1062:
                        console.log("Duplicate entry found. Could not create new department");
                        break;
                    default:
                        console.log(err);
                }
            }

            return actionPrompt();
        });
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?:'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department does this new role belong to?:',
            choices: () => new Promise((resolve, reject) => {
                db.query(queries.get_departments, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve(result.map(department => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    }));
                })
            }),
        }
    ]).then(response => {
        if (!response.title || !response.salary || !response.department) {
            console.log("Missing information. No role added, returning to selections");
            return actionPrompt();
        }
        db.query(queries.add_role(response), (err, result) => {
            if (err) {
                switch (err.errno) {
                    case 1062:
                        console.log("Duplicate entry found. Could not create new department");
                        break;
                    default:
                        console.log(err);
                }
            }
            return actionPrompt();
        });
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee:',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What role does this new employee have?:',
            choices: () => new Promise((resolve, reject) => {
                db.query(queries.get_roles, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve([{ name: "None", value: null }].concat(result.map(role => {
                        return {
                            name: `${role.department}: ${role.title}`,
                            value: role.id
                        }
                    })));
                })
            }),

        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who will manage the new employee?:',
            choices: () => new Promise((resolve, reject) => {
                db.query(queries.get_employees, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve([{ name: "No one", value: null }].concat(result.map(employee => {
                        return {
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        }
                    })));
                })
            }),
        },
    ]).then(response => {
        db.query(queries.add_employee(response), (err, result) => {
            if (err) {
                switch (err.errno) {
                    case 1062:
                        console.log("Duplicate entry found. Could not create new department");
                        break;
                    default:
                        console.log(err);
                }
            }
            return actionPrompt();
        });
    })
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee?:',
            choices: () => new Promise((resolve, reject) => {
                db.query(queries.get_employees, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    // Create an array of departments the hold their associated roles
                    const byDepartment = result.reduce((seperated, employee) => {
                        if (!seperated[employee['department']]) { seperated[employee['department']] = []; }
                        seperated[employee['department']].push(employee);
                        return seperated;
                    }, {});

                    // resolve a list of all roles, seprated by the departments they belong to
                    resolve(Object.keys(byDepartment).reduce((choices, department) => {
                        return choices.concat(new inquirer.Separator(`\u001b[33m-----${department}`.padEnd(40, '-') + ' \u001b[0m'),
                            ...byDepartment[department].map(employee => {
                                return {
                                    name: `${employee.first_name} ${employee.last_name}: ${employee.title}`,
                                    value: employee.id
                                }
                            }))
                    }, []))
                })
            }),
        },
        {
            type: 'checkbox',
            name: 'toUpdate',
            message: 'Select fields you would like to update:',
            choices: [
                { name: 'First Name', value: 'first_name' },
                { name: 'Last Name', value: 'last_name' },
                { name: 'Role', value: 'role_id' },
                { name: 'Manager', value: 'manager_id' },
            ]
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'New first name:',
            when(anwsers) {
                return anwsers.toUpdate.includes('first_name')
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'New last name:',
            when(anwsers) {
                return anwsers.toUpdate.includes('last_name')
            }
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'New role:',
            choices: () => new Promise((resolve, reject) => {
                db.query(queries.get_roles, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve([{ name: "None", value: null }].concat(result.map(role => {
                        return {
                            name: `${role.department}: ${role.title}`,
                            value: role.id
                        }
                    })));
                })
            }),
            when(anwsers) {
                return anwsers.toUpdate.includes('role_id')
            }
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'New manager:',
            choices: (anwsers) => new Promise((resolve, reject) => {
                db.query(queries.get_employees, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve([{ name: "No one", value: null }].concat(result.filter(employee => employee.id !== anwsers.employee).map(employee => {
                        return {
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        }
                    })));
                })
            }),
            when(anwsers) {
                return anwsers.toUpdate.includes('manager_id')
            }
        },
    ]).then(response => {
        db.query(queries.update_employee(response), (err, result) => {
            if (err) {
                console.log(err);
            }
        })
        actionPrompt();
    })
}

export {
    actionPrompt,

};