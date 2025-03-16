const mongoose = require("mongoose");


const connectDb = async ()=>{
    try {
        await mongoose.connect(
            `mongodb+srv://syedmusawirshahrashdi:${process.env.DB_PASSWORD}@cluster0.soien.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`
        );
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("error connecting to MongoDB", err);
    }
}

module.exports = connectDb;