const bcrypt = require("bcryptjs");
const User = require("../models/users")
const jwt = require("jsonwebtoken");




const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    //! Checking Null Values
  
    if (!firstName || !email || !password) {
      return res.json({ message: "All fields are required" });
    }
  
    //! Checking That does user exist
  
    const existUser = await User.findOne({ email });
  
    if (existUser) {
      return res.json({ message: "User already exist" });
    }
  
    //! Protecting Password
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  
    await newUser.save();
  
    res.status(201).json({ message: "user created successfully", newUser });
  };



const signin =  async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const existUser = await User.findOne({ email });
  
    if (!existUser) {
      return res
        .status(401)
        .json({ message: "Email or Password is not correct" });
    }
  
    const isPasswordMatched = await bcrypt.compare(password, existUser.password);
  
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ message: "Email or Password is not correct" });
    }
  
    const token = jwt.sign(
      { userId: existUser._id },
      process.env.JWT_SECERT_KEY,
      { expiresIn: "5h" }
    );
  
    res.json({
      message: "signin successfully",
      user: {
        id: existUser._id,
        username: existUser.firstName+ " " +existUser.lastName,
        email: existUser.email,
        token:token
      },
    });
  };  


const getUserProfile=  async(req,res)=>{
    try {
      const user = await User.findById(req.user.userId).select("-password");
    
      if(!user){
        return res.status(404).json({message:"User not found"})
      }
    
      res.json(user);
    
    } catch (error) {
      
    }
    };

module.exports ={signup, signin, getUserProfile}