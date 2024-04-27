import inquirer from 'inquirer';
import { db } from './connection.js';
import { queries } from './queries.js';
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
            // { name: 'add a department', value: addDepartment },
            // { name: 'add a role', value: addRole },
            // { name: 'add employee', value: addEmployee },
            // { name: 'update an employee role', value: updateEmployeeRole }
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
        console.log(result);
        // const table = new AsciiTable("Employees");
        // table.setHeading('id', 'first name', 'last name', 'title', 'department', 'salary', 'manager')
        // result.map(employee => table.addRow(employee.id, employee.first_name, employee.last_name, employee.title, employee.department, employee.salary, employee.manager))
        // console.log(table.toString());
        return actionPrompt();
    });
}
// const actionPompt = {
//     type: 'list',
//     name: 'action',
//     message: 'What would you like to do:',
//     choices: [
//         //TODO: change these into objects with values that are functions to be run after selection
//         { name: 'View all departments', value: showAllDepartments() },
//         { name: 'View all roles', value: showAllRoles() },
//         { name: 'View all employees', value: showAllEmployees() },
//         { name: 'add a department', value: addDepartment() },
//         { name: 'add a role', value: addRole() },
//         { name: 'add employee', value: addEmployee() },
//         { name: 'update an employee role', value: updateEmployeeRole() }
//     ]
// }






//     ,
//     departmentPrompt = {
//         type: 'input',
//         name: 'name',
//         message: 'Enter name of the new department:'
//     },
//     rolePrompt = {
//         type: 'input',
//         name: 'name',
//         message: 'Enter name of the new role:'
//     },
//     employeePrompts = {
//         firstName: {
//             type: 'input',
//             name: 'firstName',
//             message: 'Enter first name of employee:'
//         },
//         lastName: {
//             type: 'input',
//             name: 'lastName',
//             message: 'Enter last name employee:'
//         },
//         role: {
//             type: 'input',
//             name: 'role',
//             message: 'Enter role employee:'
//         },
//         manager: {
//             type: 'input',
//             name: 'manage',
//             message: 'Enter name of manager of the employee:'
//         }
//     },
//     updateEmployee = {
//         type: 'list',
//         name: 'employee',
//         message: 'Choose employee to update:',
//         choices: () => new Promise((resolve, reject) => {
//             resolve([1, 2, 3]);
//             //TODO: retrieve list of employee in database and present them as choices
//         })
//     }

export {
    actionPrompt,

};