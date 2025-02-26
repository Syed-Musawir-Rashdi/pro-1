const express = require("express");
const app = express();
const connectDb = require("./dB/dB");
const User = require("./models/users")

connectDb();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({firstName, lastName, email, password });

  await newUser.save();

  res.status(201).json({message:"user created successfully",newUser});
});

app.listen(2005, () => {
  console.log(`Welcome to the Musawir's World!`);
});
