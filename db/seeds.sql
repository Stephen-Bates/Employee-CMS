INSERT INTO departments (name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Shipping");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 40000, 1),
       ("Sales Manager", 60000, 1),
       ("Clerk", 35000, 2),
       ("Human Resources Representative", 50000, 3),
       ("Shipping Associate", 32000, 4),
       ("Truck Driver", 44000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Bates", 2, NULL),
       ("Larry", "David", 1, 1),
       ("Geno", "Biscane", 3, NULL),
       ("Aaron", "Berg", 4, NULL),
       ("Steve", "Contte", 2, 1),
       ("Garret", "Andritz", 5, 1),
       ("Parker", "dePuy", 5, 6),
       ("Jerry", "Seinfeld", 5, 6),
       ("Pebbles", "the cat", 6, 6);