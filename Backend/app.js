const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDb();

app.get("/", (req, res) => {
  res.send("hello bhai");
});
app.use("/users", userRoutes);

module.exports = app;
