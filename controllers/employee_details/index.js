const express = require("express");

const db = require("../../db/db");

const getEmployee = (req, res) => {
  try {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
      if (err) {
        throw err;
      }
      return res.json(data);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
};

const createEmployee = (req, res) => {
  try {
    const { id, name, salary, em_code } = req.body;
    const sql =
      "INSERT INTO employee (id, name, salary, em_code) VALUES (?, ?, ?, ?)";
    // use array only
    const values = [id, name, salary, em_code];
    db.query(sql, values, (err) => {
      if (err) {
        throw err;
      }
      return res.json("Employee added successfully");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res
      .status(500)
      .json({ error: "Failed to add employee", message: error.message });
  }
};

const updateEmployee = (req, res) => {
  try {
    const id = req.params.id;
    const { name, salary, em_code } = req.body;

    const sql =
      "UPDATE employee SET name = ?, salary = ?, em_code = ? WHERE id = ?";
    const values = [name, salary, em_code, id];

    db.query(sql, values, (err) => {
      if (err) {
        throw err;
      }
      return res.json("Employee updated successfully");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res
      .status(500)
      .json({ error: "Failed to update employee", message: error.message });
  }
};

const deleteEmployee = (req, res) => {
  try {
    const id = req.params.id;

    const sql = "DELETE FROM employee WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }

      return res.json("Employee deleted successfully");
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res
      .status(500)
      .json({ error: "Failed to delete employee", message: error.message });
  }
};

module.exports = {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
