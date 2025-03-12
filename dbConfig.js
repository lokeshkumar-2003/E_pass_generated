const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;

const DBConnection = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Database connected successfully....");
    })
    .catch((err) => {
      console.log("Something went wrong while connecting to database....");
      console.log(err.message);
    });
};

module.exports = DBConnection;
