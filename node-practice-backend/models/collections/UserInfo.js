const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: "First name is required!" },
  lastName: { type: String, required: "Last name is required!" },
  email: {
    type: String,
    trim: true,
    required: "Email name is required!",
    unique: [true, "User already exist!"],
  },
  password: { type: String, required: "Password name is required!" },
});

module.exports = mongoose.model("User-info", userInfoSchema);
