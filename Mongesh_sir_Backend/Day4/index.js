const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/node_mongo_2802")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.error("could not connect to mongodb"));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    gr: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/addStudent", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/addMultipleStudents", async (req, res) => {
    try {
        const students = await Student.insertMany(req.body);
        res.status(201).send(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put("/update/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            req.body,
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        res.json(deletedStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});