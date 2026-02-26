const express  = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());




//  part 1 use of get 


// mongoose.connect(`mongodb://localhost:27017/Flipcart`)
// .then(() => console.log(`connected to mongodb`))
// .catch(err => console.error(`Could not connect to MogoDB`))


app.get('/', (req, res) => {
  res.send("Hellow World!");
});


// const userSchema = new mongoose.Schema({});
// const User = mongoose.model(`users`, userSchema);

// app.get(`/users`, async (req, res)=>{
//   try{
//     const users = await User.find({city : "Delhi"});
//     res.json(users);
//   }
//   catch(err){
//     res.status(500).json({message: err.message})
//   }
// })




// const orderSchema = new mongoose.Schema({});
// const Order = mongoose.model(`orders`, orderSchema);

// app.get(`/orders`, async(req,res)=>{
//   try{
//     const orders = await Order.find({price: {$gte: 50000}});
//     res.json(orders);
//   }
//   catch(err){
//     res.status(500).json({message: err.message})
//   }
// })





// Part 2 use of post

// mongoose.connect(`mongodb://localhost:27017/Aditya`)
// .then(() => console.log(`connected to mongodb`))
// .catch(err => console.error(`Could not connect to MogoDB`))


// // create user schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// const User = mongoose.model('User', UserSchema);
// app.post('/users', async(req,res)=>{
//   try{
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send(user);
//   }
//   catch(err){
//     res.status(400).send(err);
//   }
// })













// part 3
// use of post and get

mongoose.connect(`mongodb://localhost:27017/Flipkart`)
.then(() => console.log(`connected to mongodb`))
.catch(err => console.error(`Could not connect to MogoDB`))


// create user schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});




const User = mongoose.model('User', UserSchema);
app.post('/addusers', async(req,res)=>{
  try{
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  }
  catch(err){
    res.status(400).send(err);
  }
})


app.get(`/users`, async (req, res)=>{
  try{
    const users = await User.find();
    res.json(users);
  }
  catch(err){
    res.status(500).json.json({message: err.message})
  }
})


app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});
















