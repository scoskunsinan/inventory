const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all suppliers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET supplier by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM suppliers WHERE supplier_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new supplier
router.post("/", async (req, res) => {
  try {
    const { supplier_name, contact_name, phone, email } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers 
       (supplier_name, contact_name, phone, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [supplier_name, contact_name, phone, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update supplier
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_name, contact_name, phone, email } = req.body;

    const result = await pool.query(
      `UPDATE suppliers
       SET supplier_name=$1, contact_name=$2, phone=$3, email=$4
       WHERE supplier_id=$5
       RETURNING *`,
      [supplier_name, contact_name, phone, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE supplier
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM suppliers WHERE supplier_id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

