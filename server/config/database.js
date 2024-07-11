const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connected To Database"))
    .catch((err) => {
      console.error("DB connection failed: " + err);
      process.exit(1);
    });
};

module.exports = connectDB;
