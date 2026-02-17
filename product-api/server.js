// const express = require("express");
// const app = express();
// app.use(express.json());

// const products = [
// {
// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "price": 109.95,
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
// "rating": {
// "rate": 3.9,
// "count": 120
// }
// },
// {
// "id": 2,
// "title": "Mens Casual Premium Slim Fit T-Shirts ",
// "price": 22.3,
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
// "rating": {
// "rate": 4.1,
// "count": 259
// }
// },
// {
// "id": 3,
// "title": "Cotton Jacket",
// "price": 55.99,
// "category": "women's clothing",
// "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
// "rating": {
// "rate": 4.7,
// "count": 500
// }
// }]

// app.get("/all", (req, res) => {
//     res.json(products);
// });


// app.get("/products/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const product = products.find(p => p.id === id);

//     if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
// });


// app.post("/products", (req, res) => {
//     const newProduct = {
//         id: products.length + 1,
//         ...req.body
//     };

//     products.push(newProduct);
//     res.status(201).json(newProduct);
// });


// app.get("/category/:type", (req, res) => {

//     const type = req.params.type.toLowerCase();

//     const filteredProducts = products.filter(
//         product => product.category.toLowerCase() === type
//     );

//     res.json(filteredProducts);
// });


// app.get("/products/:id/:one/:two", (req, res) => {

//     const productId = Number(req.params.id);

//     const product = products.find(p => p.id === productId);

//     if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(product);
// });


// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });






const express = require("express");
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" }
];


// edit get
app.get("/", (req, res) => {
  res.send("Express server is running");
});


app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});


// edit post
app.post("/users", (req, res) => {
    // console.log(req.body);
    // console.log(req.body[0].id);
    
  const newUser = {
    id: req.body.id,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

//   res.status(201).json({
//     message: "User created",
//     user: newUser
//   });

    res.send("user added");  // upar wala nii likhna to 
    res.status(201).send("user added");  // upar wale ka shortcut form  
});


app.post("/usersss", (req,res) => {
    console.log("Req body : ", req.body);
    
    const user1 = {
        id: req.body[0].id,
        name: req.body[0].name,
        role: req.body[0].role
    }
    console.log("user1 : ", user1);
    users.push(user1);

    const user2 = {
        id: req.body[1].id,
        name: req.body[1].name,
        role: req.body[1].role
    }
    console.log("user2 : ", user2);
    users.push(user2);


    const user3 = {
        id: req.body[2].id,
        name: req.body[2].name,
        role: req.body[2].role
    }
    console.log("user3 : ", user3);
    users.push(user3);


    res.send("users added");
    
})


// edit put
app.put("/users/:id", (req, res) => {

    console.log("body : ", req.body);
    console.log("params : ", req.params);
    

  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role,
    age: req.body.age
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});