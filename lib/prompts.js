module.exports = {
    actionPrompt: {
        type: 'list',
        name: 'action',
        message: 'What would you like to do:',
        choices: [
            //TODO: change these into objects with values that are functions to be run after selection
            'View all departments',
            'View all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add employee',
            'update and employee role'
        ]
    },
    departmentPrompt: {
        type: 'input',
        name: 'name',
        message: 'Enter name of the new department:'
    },
    rolePrompt: {
        type: 'input',
        name: 'name',
        message: 'Enter name of the new role:'
    },
    employeePrompts: {
        firstName: {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name of employee:'
        },
        lastName: {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name employee:'
        },
        role: {
            type: 'input',
            name: 'role',
            message: 'Enter role employee:'
        },
        manager: {
            type: 'input',
            name: 'manage',
            message: 'Enter name of manager of the employee:'
        }
    },
    updateEmployee: {
        type: 'list',
        name: 'employee',
        message: 'Choose employee to update:',
        choices: () => new Promise((resolve, reject) = {
            //TODO: retrieve list of employee in database and present them as choices
        })
    }
}