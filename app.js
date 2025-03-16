require("dotenv").config();
const express = require("express");
const connectDb = require("./config/dB");
const authRoutes = require("./routes/authRoutes")


const app = express();

//?Connect to DB
connectDb();


//? Middleware parsing json
app.use(express.json());


//?Routes
app.use("/auth", authRoutes)

app.listen(2005, () => {
    console.log(`server is running on 2005`);
});  