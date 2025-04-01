const { Pool } = require("pg");
const inquirer = require("inquirer");

require("dotenv").config();
const db = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL successfully!');
  }
});

function selectQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do today",
        name: "queryOptions",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add New Departments",
          "Add New Role",
          "Add New Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.queryOptions) {
        case "View All Departments":
          manageDepartment();
          break;
        case "View All Roles":
          manageRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          manageEmployees();
          break;
        case "Add New Departments":
          targetDepartment();
          break;
        case "Add New Role":
          newRole();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "Update Employee Role":
          updateExistingRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}

function manageDepartment() {
  db.query("SELECT * FROM department ORDER BY id", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result.rows);
    selectQuestion();
  });
}

function manageRoles() {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result.rows);
    selectQuestion();
  });
}

function manageEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result.rows);
    selectQuestion();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result.rows);
    selectQuestion();
  });
}

function targetDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "addDepartment",
      },
    ])
    .then((answer) => {
      db.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *',
        [answer.addDepartment],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`\n`);
          console.table(result.rows);
          selectQuestion();
        }
      );
    });
}

function newRole() {
  // First get all departments
  db.query("SELECT * FROM department", (err, deptResult) => {
    if (err) {
      console.log('Error fetching departments:', err);
      selectQuestion();
      return;
    }

    console.log('\nAvailable Departments:');
    console.table(deptResult.rows);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title of the role you would like to add?",
          name: "addNewTitle",
        },
        {
          type: "input",
          message: "What is the salary of the role you would like to add?",
          name: "addNewSalary",
        },
        {
          type: "number",
          message: "Enter the department ID from the list above:",
          name: "addNewDepartment",
        },
      ])
      .then((answer) => {
        db.query(
          'INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
          [
            answer.addNewTitle, 
            parseFloat(answer.addNewSalary), 
            parseInt(answer.addNewDepartment)
          ],
          (err, result) => {
            if (err) {
              console.log('Error adding new role:', err);
              selectQuestion();
              return;
            }
            
            console.log("\nNew role added successfully!");
            console.table(result.rows);
            selectQuestion();
          }
        );
      });
  });
}

function newEmployee() {
  // First get all roles with specific columns
  db.query("SELECT id, title, salary, department_id FROM role", (err, roleResult) => {
    if (err) {
      console.log('Error fetching roles:', err);
      selectQuestion();
      return;
    }

    console.log('\nAvailable Roles:');
    console.table(roleResult.rows);

    // Get current employees with specific columns
    db.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee", (err, empResult) => {
      if (err) {
        console.log('Error fetching employees:', err);
        selectQuestion();
        return;
      }

      console.log('\nPotential Managers:');
      console.table(empResult.rows);

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "addNewEmployeeFirstName",
            validate: input => input ? true : "First name cannot be empty"
          },
          {
            type: "input",
            message: "What is the employee last name?",
            name: "addNewEmployeeLastName",
            validate: input => input ? true : "Last name cannot be empty"
          },
          {
            type: "number",
            message: "Enter the role ID from the list above:",
            name: "addNewEmployeeRoleId",
            validate: input => {
              const id = parseInt(input);
              if (isNaN(id) || id <= 0) {
                return "Please enter a valid role ID number";
              }
              return true;
            }
          },
          {
            type: "number",
            message: "Enter the manager's ID (or 0 for no manager):",
            name: "newEmployeeManager",
            validate: input => {
              const id = parseInt(input);
              if (isNaN(id) || id < 0) {
                return "Please enter a valid manager ID or 0 for no manager";
              }
              return true;
            }
          }
        ])
        .then((answer) => {
          const roleId = parseInt(answer.addNewEmployeeRoleId);
          const managerId = parseInt(answer.newEmployeeManager);

          if (isNaN(roleId) || roleId <= 0) {
            console.log("\nInvalid role ID");
            selectQuestion();
            return;
          }

          if (isNaN(managerId) || managerId < 0) {
            console.log("\nInvalid manager ID");
            selectQuestion();
            return;
          }

          db.query(
            'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING first_name, last_name, role_id, manager_id',
            [
              answer.addNewEmployeeFirstName,
              answer.addNewEmployeeLastName,
              roleId,
              managerId === 0 ? null : managerId
            ],
            (err, result) => {
              if (err) {
                console.log('Error adding new employee:', err);
                selectQuestion();
                return;
              }
              
              console.log("\nNew employee added successfully!");
              console.table(result.rows);
              selectQuestion();
            }
          );
        });
    });
  });
}

function updateExistingRole() {
  // First show all employees
  db.query("SELECT id, first_name, last_name, role_id FROM employee", (err, empResult) => {
    if (err) {
      console.log('Error fetching employees:', err);
      selectQuestion();
      return;
    }

    console.log('\nCurrent Employees:');
    console.table(empResult.rows);

    // First prompt for employee ID
    inquirer
      .prompt([
        {
          type: "number",
          name: "employee_id",
          message: "Enter the employee ID you would like to update:",
          validate: input => {
            const id = parseInt(input);
            return !isNaN(id) && id > 0 ? true : "Please enter a valid employee ID";
          }
        }
      ])
      .then((employeeAnswer) => {
        // After employee ID entered, show roles and prompt for role ID
        db.query("SELECT id, title, salary, department_id FROM role", (err, roleResult) => {
          if (err) {
            console.log('Error fetching roles:', err);
            selectQuestion();
            return;
          }

          console.log('\nAvailable Roles:');
          console.table(roleResult.rows);

          // Now prompt for role ID
          inquirer
            .prompt([
              {
                type: "number",
                message: "Enter the new role ID from the list above:",
                name: "role_id",
                validate: input => {
                  const id = parseInt(input);
                  return !isNaN(id) && id > 0 ? true : "Please enter a valid role ID";
                }
              }
            ])
            .then((roleAnswer) => {
              // Update the employee's role
              db.query(
                'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING first_name, last_name, role_id',
                [parseInt(roleAnswer.role_id), parseInt(employeeAnswer.employee_id)],
                (err, result) => {
                  if (err) {
                    console.log('Error updating employee role:', err);
                    selectQuestion();
                    return;
                  }
                  
                  if (!result.rows.length) {
                    console.log("\nNo employee found with that ID");
                    selectQuestion();
                    return;
                  }

                  console.log("\nEmployee role updated successfully!");
                  console.table(result.rows);
                  selectQuestion();
                }
              );
            });
        });
      });
  });
}

function exit() {
  console.log('Goodbye!');
  process.exit();
}

selectQuestion();
