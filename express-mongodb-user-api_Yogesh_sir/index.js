// Today Class 
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;


// Middleware to parse JSON bodies
app.use(express.json());



/// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Filpkart")
.then(() => console.log("MongoDB Connected Successfully"))
.catch((error) => console.log("MongoDB Connection Failed", error));





// Empty schema (only for fetching)
const userSchema = new mongoose.Schema({
    
});



// collection Name  
const User = mongoose.model("users", userSchema);


// Basic route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// GET route using find()
app.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database

    const data = await User.find({city: "Delhi"});

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



/// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});