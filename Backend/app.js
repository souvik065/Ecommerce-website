const express = require("express");
const  app = express();
// Routes Imports
const product = require("./routes/productRoute");

const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use("/api/v1",product);

app.use(errorMiddleware);   // Middleware for Errors






module.exports = app