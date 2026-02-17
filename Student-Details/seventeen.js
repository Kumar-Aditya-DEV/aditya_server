const express = require("express");
const app = express();

app.use(express.json());

// In-memory database
const users = [
  {
    id: 1,
    uid: "108716",
    name: "Aditya Kumar",
    att: 80,
    total_sub: 14,
    bonus: 20
  }
];

/* ===============================
   GET - Home Route
================================ */
app.get("/", (req, res) => {
  res.send("🚀 Express Server is Running...");
});

/* ===============================
   GET - Get User by UID
================================ */
app.get("/users/:uid", (req, res) => {
  const user = users.find(u => u.uid === req.params.uid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

/* ===============================
   POST - Create User
================================ */
app.post("/users", (req, res) => {
  const { name, uid, att, total_sub, bonus } = req.body;

  // Validation
  if (!name || !uid || !att || !total_sub || !bonus) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check duplicate UID
  const existingUser = users.find(u => u.uid === uid);
  if (existingUser) {
    return res.status(400).json({ message: "UID already exists" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    uid,
    att: Number(att),
    total_sub: Number(total_sub),
    bonus: Number(bonus)
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

/* ===============================
   PUT - Update User
================================ */
app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    ...users[index],
    ...req.body
  };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index]
  });
});

/* ===============================
   DELETE - Remove User
================================ */
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});

/* ===============================
   Server Listen
================================ */
app.listen(3000, () => {
  console.log("🔥 Server started on port 3000");
});
