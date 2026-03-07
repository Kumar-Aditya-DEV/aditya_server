const express = require('express')
const mongoose  = require('mongoose')
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect("mongodb+srv://aditya123:aditya_atlas@cluster0.17m4c1y.mongodb.net/Day10UsersLab1?appName=Cluster0")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("could not connect to mongodb"));

const userSchema = new mongoose.Schema({
  name:{
   type:String,
   required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
   type:String,
   required:true
  },
  role:{
     type:String,
     enum:["Student","Mentor","Admin"],
     default:"Student"
  }
})

const User = mongoose.model("User",userSchema)

app.post("/users", async (req,res)=>{
  try{
    const user = new User(req.body)
    await user.save()
    res.json(user)
  }catch(err){
    res.status(400).send(err)
  }
})

app.get("/users", async (req,res)=>{
  try{
    const users = await User.find()
    res.json(users)
  }catch(err){
    res.status(500).send(err)
  }
})

app.get("/users/:id", async (req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    res.json(user)
  }catch(err){
    res.status(500).send(err)
  }
})

app.put("/users/:id", async (req,res)=>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(user)
  }catch(err){
    res.status(500).send(err)
  }
})

app.patch("/users/:id", async (req,res)=>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id,{ $set:req.body },{new:true})
    res.json(user)
  }catch(err){
    res.status(500).send(err)
  }
})

app.delete("/users/:id", async (req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user)
  }catch(err){
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
