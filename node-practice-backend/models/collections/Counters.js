const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("counters", CounterSchema);
