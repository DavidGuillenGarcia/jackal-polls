const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected");
  } catch (error) {
    console.error(error);
    throw new Error("Connection failed");
  }
};

module.exports = dbConnection;
