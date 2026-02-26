const express  = require('express');
const app = express();


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Flipcart")
.then(() => console.log("connected to mongodb"))
.catch(err => console.error("Could not connect to MongoDB"))

app.get('/', (req, res) => {
  res.send("Hellow World!");
});



const userSchema = new mongoose.Schema({});
const User = mongoose.model("users", userSchema);

app.get("/users", async (req, res)=>{
  try{
    const users = await User.find({city:"Delhi"});
    res.json(users);
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
})



const orderSchema = new mongoose.Schema({});
const Order = mongoose.model("orders", orderSchema);

app.get("/orders", async(req,res)=>{
  try{
    const orders = await Order.find({price: {$gte: 50000}});
    res.json(orders);
  }
  catch(err){
    res.status(500).json({message: err.message})
  }
})

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});