const User = require("../models/userModel");
const Station=require("../models/stationModel")
const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  try {
    const {email, password ,stationName ,stationCode} = req.body;

    if ( !email || !password || !stationName || !stationCode) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const check=await Station.findOne({stationName,stationCode})
    if(!check)
    {
      return res.status(400).json({message:"Station has no been created yet"})
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Station master already exists" });
    }

    const user = await User.create({
      email,
      password,
      stationName,
      stationCode
    });

    if (user) {
      res.status(201).json({message :"Station master created successfully"});
    } else {
      res.status(400).json({ message: "Failed to create the user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user)
    {
        return res.status(401).json({message:"Not authorized to access"});
    }
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        stationName:user.stationName,
        stationCode:user.stationCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { registerUser, loginUser };
