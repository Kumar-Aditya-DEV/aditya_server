const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://aditya123:aditya_atlas@cluster0.17m4c1y.mongodb.net/Day5UsersLab1?appName=Cluster0")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("could not connect to mongodb"));

const bioData = new mongoose.Schema({
    name: String,
    email : String,
    age : Number
});

const getData = mongoose.model("BioData", bioData);

app.get("/", (req, res) =>{
    res.send("aapka server sahi dirxn me ah");
})


app.get("/getAllData", async (req, res) => {
    try {
        const fetchData = await getData.find();
        res.status(200).json(fetchData);
    }
    catch(err) {
        return res.status(404).json({ message: "Data Not Added" });
    }
})



app.post("/addData", async(req, res) =>{
    try{
        const std = await getData.create(req.body);
        // await std.save();
        res.status(201).json(std);
    }
    catch (err) {
        res.status(400).send(err);
    }
});




app.listen(5000, ()=>{
    console.log("Server is running on port 5000"); 
})
