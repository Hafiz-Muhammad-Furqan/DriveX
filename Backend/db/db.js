const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
