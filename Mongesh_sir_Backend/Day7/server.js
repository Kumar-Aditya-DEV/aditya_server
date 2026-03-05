const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://aditya123:aditya_atlas@cluster0.17m4c1y.mongodb.net/Day7UsersLab1?appName=Cluster0")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("could not connect to mongodb"));



// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// const getData = mongoose.model("BioData", userSchema);


// Ajj ka topic hai schema validation

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
  },
  age:{
    type: Number,
    required: true
  }
})

const getData = mongoose.model("BioData", userSchema);

app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

// GET
app.get("/users", async (req,res)=>{
  const data = await getData.find();
  res.send(data);
});

// POST
app.post("/users", async (req,res)=>{
  const data = new getData(req.body);
  await data.save();
  res.send(data);
});

// PUT
app.put("/users/:id", async (req,res)=>{
  const data = await getData.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(data);
});

// PATCH
app.patch("/users/:id", async (req,res)=>{
  const data = await getData.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(data);
});

// DELETE
app.delete("/users/:id", async (req,res)=>{
  await getData.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});