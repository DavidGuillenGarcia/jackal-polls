const mongoose = require("mongoose");
const User = require("./users");
const Poll = require("./polls");

const votesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },
  pollId: {
    type: mongoose.Schema.ObjectId,
    ref: Poll,
    required: true,
  },
  optionSelected: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vote", votesSchema);
