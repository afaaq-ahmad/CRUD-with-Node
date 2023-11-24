const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Practice";

const connectDB = () => {
  return mongoose.connect(url);
};

module.exports = connectDB;
