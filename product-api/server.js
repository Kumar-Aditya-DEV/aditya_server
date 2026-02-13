const express = require("express");
const app = express();
app.use(express.json());

const products = [
{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
"rating": {
"rate": 3.9,
"count": 120
}
},
{
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
"rating": {
"rate": 4.1,
"count": 259
}
},
{
"id": 3,
"title": "Cotton Jacket",
"price": 55.99,
"category": "women's clothing",
"image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
"rating": {
"rate": 4.7,
"count": 500
}
}]

app.get("/all", (req, res) => {
    res.json(products);
});


app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});


app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.get("/category/:type", (req, res) => {

    const type = req.params.type.toLowerCase();

    const filteredProducts = products.filter(
        product => product.category.toLowerCase() === type
    );

    res.json(filteredProducts);
});


app.get("/products/:id/:one/:two", (req, res) => {

    const productId = Number(req.params.id);

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});