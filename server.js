const express = require("express");
const inquirer = require("inquirer")
const mysql = require('mysql2');
const connection = require("./db/connection");
const cTable = require("console.table")
const chalk = require("chalk");



const PORT = process.env.PORT || 3001;
const app = express()



// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connection.connect((err) => {
    if (err) throw err
    console.log(chalk.magenta.bold(`==================================`));
    console.log("");
    console.log(chalk.green("Connected to Employee Data Base!"))
    console.log("");
    console.log(chalk.magenta.bold(`==================================`));
    overview()

});

const overview = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "Welcome what would you like to do you can view, add, update, and remove a employee",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "View all employees by department",
                // "View all department budgets",
                "Update employee role",
                // "Update employee manager",
                "Add employee",
                "Add role",
                "Add department",
                // "Remove employee",
                // "Remove role",
                // "Remove department",
                "Exit"
            ]
        }
    ])
        .then((answers) => {
            const {choices} = answers;
            if (choices === "View all employees") {
                viewAllEmployees()
            }
            if (choices === "View all roles") {
                viewAllRoles()
            }
            if (choices === "View all departments") {
                viewAllDepartments()
            }
            if (choices === "View all employees by department") {
                viewAllEmployeesByDepartment()
            }
            if (choices === "Add employee") {
                addEmployee()
            }
            // if (choices === "Remove employee") {
            //     removeEmployee()
            // }
            if (choices === "Update employee role") {
                updateEmployeeRole()
            }
            // if (choices === "Update employee manager") {
            //     updateEmployeeRole()
            // }
            // if (choices === "Add role") {
            //     addRole()
            // }
            // if (choices === "Remove role") {
            //     removeRole()
            // }
            if (choices === "Add department") {
                addDepartment()
            }
            // if (choices === "View department budget") {
            //     viewDepartmentBudget()
            // }
            // if (choices === "Remove department") {
            //     removeDepartment()
            // }
            if (choices === "Exit") {
                connection.end()
            }
        })

}

// functions for the choices

//view all employees
const viewAllEmployees = () => {
    const query = `SELECT employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    role.title, 
                    department.department_name AS 'department', 
                    role.salary
                    FROM employee, role, department 
                    WHERE department.id = role.department_id 
                    AND role.id = employee.role_id
                    ORDER BY employee.id ASC`;

    connection.query(query, (err, res) =>{
        if (err) throw err;
        console.log(chalk.magenta.bold(`==================================`))
        console.log(`         ` + chalk.green(`Current Employees:`))
        console.log(chalk.magenta.bold(`==================================`))
        console.table(res)
        console.log(chalk.magenta.bold(`==================================`))
        overview()
    })
}

// view all roles
const viewAllRoles = () => {
    console.log(chalk.magenta.bold(`==================================`))
    console.log(`         ` + chalk.green(`Current Employee Roles:`))
    console.log(chalk.magenta.bold(`==================================`))
    const query = `SELECT role.id, role.title, department.department_name AS department
                    FROM role
                    INNER JOIN department ON role.department_id = department.id`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.forEach((role) => { console.log(role.title) });
        overview()
    })
}

const viewAllDepartments = () => {
    const query = `SELECT department.id AS id, 
                    department.department_name 
                    AS department FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err
        console.log(chalk.magenta.bold(`==================================`))
        console.log(`         ` + chalk.green(`All Departments:`))
        console.table(res);
        console.log(chalk.magenta.bold(`==================================`))
        overview()
    })
}

const viewAllEmployeesByDepartment = () => {
    const query = `SELECT employee.first_name, 
                    employee.last_name, 
                    department.department_name AS department
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(query, function (err, res) {
        if (err) throw err
        console.log(chalk.magenta.bold(`==================================`))
        console.log(`         ` + chalk.green(`Employees by department:`))
        console.table(res);
        console.log(chalk.magenta.bold(`==================================`))
        overview()
    })
}



const addEmployee = () => {
    inquirer.prompt([
        {
          name: 'firstName',
          type: 'input',
          message: "What is the employee's first name?",
        },
        {
          name: 'lastName',
          type: 'input',
          message: "What is the employee's last name?",
        },
        {
          name: 'roleId',
          type: 'input',
          message: "What is the employee's job id?",
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'What is the manager Id?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
          function (err, res) {
            if (err) throw err;
            console.log(chalk.magenta.bold(`==================================`))
            console.log(`          ` + chalk.green(`Employee record for ${answer.firstName} ${answer.lastName} has been added!`))
            console.table(res);
            console.log(chalk.magenta.bold(`==================================`))
            overview();
          }
        );
      });
  };


const addRole = () => {
    inquirer.prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the role title?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this job?',
        },
        {
          name: 'deptId',
          type: 'input',
          message: 'What is the department ID number?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
          [answer.roleTitle, answer.salary, answer.deptId],
          function (err, res) {
            if (err) throw err;
            console.log(chalk.magenta.bold(`==================================`))
            console.log(`          ` + chalk.green(`Role added!:`))
            console.table(res);
            console.log(chalk.magenta.bold(`==================================`))
            overview()
            
          }
        );
      });
  };
    

//add a department
const addDepartment = () => {
    return inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What is the name of the department?",
            
        }
    ])
    .then((answer) => {
        let sql= `INSERT INTO department (department_name) VALUES (?)`
        connection.query(sql, answer.newDepartment, (err, res) => {
            if (err) throw err
            console.log(chalk.magenta.bold(`==================================`))
            console.log(`          ` + chalk.green(`Department made!:`))
            console.table(res);
            console.log(chalk.magenta.bold(`==================================`))
            overview()
        })
    })
}

const updateEmployeeRole = () => {
   return inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Enter employee id',
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'Enter new role id',
        },
      ])
      .then(answer => {
        connection.query(
          'UPDATE employee SET role_id=? WHERE id=?',
          [answer.roleId, answer.id],
          function (err, res) {
            if (err) throw err;
            console.log(chalk.magenta.bold(`==================================`))
            console.log(`          ` + chalk.green(`Employee role has been updated!:`))
            console.table(res);
            console.log(chalk.magenta.bold(`==================================`))
            overview()
          }
        );
      });
  };





// app.use((req, res) => {
//     res.status(404).end();
// });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

