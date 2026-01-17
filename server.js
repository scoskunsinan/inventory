require("dotenv").config();
const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");
const suppliersRoutes = require("./routes/suppliers");


app.use(express.json());
app.use("/products", productsRoutes);
app.use("/suppliers", suppliersRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
