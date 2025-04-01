# Employee-Tracker

## Description

This is Employee Tracker showcasing my work including build a command-line application from scratch to manage a company's employee database by using Node.js , Inquirer and Postgres and the you should be able to view employees, departments, employee roles, add new employee , department  and roles.
Feel free to view my work here.

## Languages
- Node.js
- Inquirer (npm utility)
- Postgres database

## Link to GitHub main project page

[Portfolio Project Page on GitHub](https://github.com/pingJustin/employeeTracker)
                             
### Link to Walkthrough Video

https://github.com/pingJustin/employeeTracker/blob/main/SampleUsage.mp4

## Contact Information

Github: [pingjustin](https://github.com/pingJustin)

Email: pingjustin@gmail.com

# 10 SQL: Employee Tracker

## Your Task

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and Postgres.

Because this application won’t be deployed, you’ll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You’ll need to submit a link to the video and add it to the README of your project.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
