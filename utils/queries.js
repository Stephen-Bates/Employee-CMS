export const queries = {
    get_departments: `SELECT * FROM departments`,
    get_roles: `SELECT roles.*,
                       departments.name AS department
                FROM roles
                JOIN departments 
                    ON roles.department_id = departments.id`,
    get_employees: `
    SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        roles.salary,
        departments.name as department,
        concat(managers.first_name,\" \",managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id 
    JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id`,

    add_department: (data) => { return `INSERT INTO departments (name) VALUES ("${data.name}")` },
    add_role: (data) => { return `INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${data.department})` },
    add_employee: (data) => { return `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role_id}, ${data.manager_id})` },
    //write update query
    update_employee: (data) => {
        return `
        UPDATE employees
        SET
            ${data.first_name !== undefined ? `first_name = '${data.first_name}'` : ''}
            ${data.last_name !== undefined ? `, last_name = '${data.last_name}'` : ''}
            ${data.role_id !== undefined ? `, role_id = ${data.role_id}` : ''}
            ${data.manager_id !== undefined ? `, manager_id = ${data.manager_id}` : ''}
        WHERE id = ${data.id}`
    }
}