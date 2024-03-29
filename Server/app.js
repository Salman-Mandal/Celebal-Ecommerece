const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookie = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// console.log(process.env.FRONTEND_URL);
app.use(express.json());
app.use(cookie());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderroute")
const payment = require("./routes/paymentRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//middleware for error
app.use(errorMiddleware);

module.exports = app;