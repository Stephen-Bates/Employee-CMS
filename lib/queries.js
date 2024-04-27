export const queries = {
    get_departments: "SELECT * FROM departments",
    get_roles: "SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id=departments.id",
    get_employees: "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, concat(managers.first_name,\" \",managers.last_name) AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id JOIN employees AS managers ON employees.manager_id = managers.id",
}