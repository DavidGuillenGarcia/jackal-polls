const mongoose = require("mongoose");

const optionsSchema = new mongoose.Schema({
  option_1: {
    type: String,
    required: true,
  },
  option_2: {
    type: String,
    required: true,
  },
  option_3: {
    type: String,
  },
  option_4: {
    type: String,
  },
});

const pollsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: [optionsSchema],
  status: {
    type: String,
    default: "open",
  },
});

module.exports = mongoose.model("Poll", pollsSchema);
