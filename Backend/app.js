const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");
// const paymentRoutes = require("./routes/payment.routes");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);
// app.use("/api/payfast", paymentRoutes);

module.exports = app;
