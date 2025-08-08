const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");
const cookieParser = require("cookie-parser");
const paymentRoutes = require("./routes/payment.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(cookieParser());
connectToDb();

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;
