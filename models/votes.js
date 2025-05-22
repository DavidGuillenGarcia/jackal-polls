const mongoose = require("mongoose");
const User = require("./users");
const Poll = require("./polls");

const votesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },
  poll_id: {
    type: mongoose.Schema.ObjectId,
    ref: Poll,
    required: true,
  },
  option_selected: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vote", votesSchema);
