const { Pool } = require("pg");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

// parse JSON data
app.use(bodyParser.json());

const port = 4000;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employeedb",
  password: "12345",
  port: 5432,
});

// GET all employees
app.get("/employees", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM employee");
    res.json(result.rows);
  } finally {
    client.release();
  }
});

// POST a new employee
app.post("/employees", (req, res) => {
  const { name, age, education, experience, profile, department, salary } =
    req.body;

  // Check if all required fields are present and not empty
  if (
    !name ||
    !age ||
    !education ||
    !experience ||
    !profile ||
    !department ||
    !salary
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert the employee data into the database
  const query =
    "INSERT INTO employee (name, age, education, experience, profile, department, salary) VALUES ($1, $2, $3, $4, $5, $6, $7)";
  const values = [
    name,
    age,
    education,
    experience,
    profile,
    department,
    salary,
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    } else {
      res.status(201).json({ success: true });
    }
  });
});

// DELETE an employee
app.delete("/employees/:name", async (req, res) => {
  const name = req.params.name;
  const deleteQuery = "DELETE FROM employee WHERE name = $1";
  try {
    const { rowCount } = await pool.query(deleteQuery, [name]);
    res.json({ message: `${rowCount} employee deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT (update) an employee
app.put("/employees/:name", async (req, res) => {
  const name = req.params.name;
  const { age, education, experience, profile, department, salary } = req.body;
  const updateQuery =
    "UPDATE employee SET age=$2, education=$3, experience=$4, profile=$5, department=$6, salary=$7 WHERE name=$1";
  const values = [
    name,
    age,
    education,
    experience,
    profile,
    department,
    salary,
  ];
  try {
    const { rowCount } = await pool.query(updateQuery, values);
    res.json({ message: `${rowCount} employee updated` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/employees`);
});
