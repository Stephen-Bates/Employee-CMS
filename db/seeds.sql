INSERT INTO departments (name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Shipping");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 18.50, 1),
       ("Sales Manager", 25.67, 1),
       ("Clerk", 22.34, 2),
       ("Human Resources Representative", 30.25, 3),
       ("Shipping Associate", 17.45, 4);
       ("Truck Driver", 24.75, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Bates", 2, NULL),
       ("Stephen", "Bates", 1, 1),
       ("Stephen", "Bates", 3, NULL),
       ("Stephen", "Bates", 4, NULL),
       ("Stephen", "Bates", 2, 1),
       ("Stephen", "Bates", 5, 1),
       ("Stephen", "Bates", 5, 6),
       ("Stephen", "Bates", 5, 6),
       ("Stephen", "Bates", 6, 6);