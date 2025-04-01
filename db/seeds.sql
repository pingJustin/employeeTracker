INSERT INTO department (name)
VALUES ('Engineering'),
       ('Customer service'),
       ('Finance'),
       ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 300000, 1),
       ('Software Engineer', 200000, 1),
       ('Head of Customer service', 130000, 2),
       ('Customer Service Staff', 100000, 2),
       ('Account Manager', 150000, 3),
       ('Accountant', 130000, 3),
       ('Marketing Team Lead', 200000, 4),
       ('Marketing Staff', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Edward', 'Kay', 1, NULL),
       ('Ethan', 'Hill', 2, 1),
       ('Kanwara', 'Ho', 3, NULL), 
       ('May', 'Ham', 4, 3),
       ('Brandon', 'Home', 5, NULL),
       ('Erika', 'Tam', 6, 5),
       ('Bambam', 'Mo', 7, NULL),
       ('Nan', 'Nam', 8, 7);