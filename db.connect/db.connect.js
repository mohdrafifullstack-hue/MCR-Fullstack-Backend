const mongoose = require("mongoose");
require("dotenv").config();
const mongo_uri=process.env.MONGODB
const initialDatabase = async () => {
  await mongoose
    .connect(mongo_uri)
    .then(() => {
      console.log("Database Connectd");
    })
    .catch((err) => {
      console.log("Failed to connect database", err);
    });
};

module.exports = { initialDatabase };
