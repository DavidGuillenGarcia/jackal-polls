const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema({
  poll_name: {
    type: String,
    required: true,
  },
  option_1: {
    type: String,
    default: "Yes",
    required: true,
  },
  option_2: {
    type: String,
    default: "No",
    required: true,
  },
  option_3: {
    type: String,
  },
  option_4: {
    type: String,
  },
  status: {
    type: String,
    default: "Open",
  },
});

module.exports = mongoose.model("Poll", pollsSchema);
