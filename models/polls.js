const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema({
  poll_name: {
    type: String,
    required: true,
  },
  option_1: {
    type: String,
    default: "Yes",
  },
  option_2: {
    type: String,
    default: "No",
  },
  option_3: {
    type: String,
  },
  option_4: {
    type: String,
  },
  status: {
    type: String,
    default: "open",
  },
});

module.exports = mongoose.model("Poll", pollsSchema);
