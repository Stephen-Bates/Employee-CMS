import mysql from 'mysql2';

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Rutabaga16^',
        database: 'employee_db'
    },
    console.log(`Connected to the courses_db database.`)
);

export { db };