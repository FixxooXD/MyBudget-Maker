const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
require("dotenv").config();
const cors = require("cors")
const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to Database"));


app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
  res.send("yess");
});

app.post("/auth", async (req, res) => {
  try {
    const users = await userModel.create(req.body);
    console.log(req.body);  
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
