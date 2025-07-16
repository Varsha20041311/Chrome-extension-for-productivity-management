// Import required modules
const express = require("express");         // Express framework to handle HTTP routes
const mongoose = require("mongoose");       // Mongoose for MongoDB interaction
const cors = require("cors");               // Middleware to handle Cross-Origin requests

// Connect to MongoDB database called "productivity"
mongoose.connect("mongodb://127.0.0.1:27017/productivity");

// Define a Mongoose schema for browsing history
const HistorySchema = new mongoose.Schema({
  url: String,         // URL visited by the user
  timestamp: String,   // When the URL was accessed
});

// Create a Mongoose model from the schema
const History = mongoose.model("History", HistorySchema);

// Initialize Express app
const app = express();

// Enable CORS to allow requests from other origins (e.g., frontend)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route to save a new history record (POST /history)
app.post("/history", async (req, res) => {
  const record = new History(req.body);  // Create new document from request body
  await record.save();                   // Save it to MongoDB
  res.json({ message: "Saved" });        // Send success response
});

// Route to get all saved history records (GET /history)
app.get("/history", async (req, res) => {
  const data = await History.find();     // Retrieve all documents from the collection
  res.json(data);                        // Send them as JSON response
});

// Start the server on port 5002
app.listen(5002, () => {
  console.log("Backend running on http://localhost:5002");
});
