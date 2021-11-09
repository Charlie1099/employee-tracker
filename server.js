const express = require("express");
const mysql = require("mysql2");


const PORT = process.env.PORT || 3001;
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use((req, res) => {
    res.status(404).end();
});


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1099758CDc)",
    database: "etracker"
},
 console.log("Connected to the etracker databsse.")
 );

// db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
//   })

// db.query(`SELECT * FROM employee WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// delete a employee
// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//make a employee
const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?,?)`;
const params = [1, "Ricky", "Bobby", 1, null];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

