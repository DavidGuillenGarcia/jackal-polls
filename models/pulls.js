const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Ingredient", ingredientsSchema);
