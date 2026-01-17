const express = require("express");
const router = express.Router();
const pool = require("../db");

/// GET alla produkter
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

/// GET produkt via ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(result.rows[0]);
});

/// POST skapa produkt
router.post("/", async (req, res) => {
  const { name, quantity, price, category } = req.body;

  const result = await pool.query(
    "INSERT INTO products (name, quantity, price, category) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, quantity, price, category]
  );

  res.status(201).json(result.rows[0]);
});

/// PUT uppdatera produkt
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, category } = req.body;

  const result = await pool.query(
    "UPDATE products SET name=$1, quantity=$2, price=$3, category=$4 WHERE id=$5 RETURNING *",
    [name, quantity, price, category, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(result.rows[0]);
});

/// DELETE ta bort produkt
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted" });
});

module.exports = router;
