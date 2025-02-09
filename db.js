const mongoose = require("mongoose");

// Define the MongoDB URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error: " + err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
