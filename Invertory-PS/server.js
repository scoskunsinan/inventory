require("dotenv").config();
const express = require("express");

const productsRoutes = require("./routes/products");
const suppliersRoutes = require("./routes/suppliers");

const app = express();

app.use(express.json());

app.use("/products", productsRoutes);
app.use("/suppliers", suppliersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

