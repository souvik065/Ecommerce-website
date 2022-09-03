const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieparser());

// Routes Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware); // Middleware for Errors

module.exports = app;
