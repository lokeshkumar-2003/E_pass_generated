const mongoose = require("mongoose");
require("dotenv").config();

const DBConnection = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("❌ MONGO_URL is not defined in .env file");
    }

    console.log(`🔍 Connecting to MongoDB at: ${process.env.MONGO_URL}`);

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ Something went wrong while connecting to the database:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = DBConnection;
