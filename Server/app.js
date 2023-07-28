const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookie = require("cookie-parser");
const cors = require('cors');

app.use(express.json());
app.use(cookie());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderroute")
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for error
app.use(errorMiddleware);

module.exports = app;