const User = require("../models/userModel");
const Station=require("../models/stationModel")
const generateToken = require("../config/generateToken");
const nodemailer = require("nodemailer");
const bcrypt=require("bcryptjs")
const crypto = require("crypto");

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
 const otpStorage = new Map();
const forgetPassword=async(req,res)=>{


 const email  = req.body.email;
 const user = await User.findOne({ email });
 if (!user) {
   return res.status(401).json({ message: "Not authorized to access" });
 }
 var smtpConfig = {
   host: "smtp.gmail.com",
   port: process.env.EMAIL_PORT,
   secure:true,
   service:'GMAIL',
   auth: {
     user: process.env.USER_NAME,
     pass: process.env.USER_PASS,
   },
 };

 const transporter = nodemailer.createTransport(smtpConfig);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
   otpStorage.set(email, otp);
  const mailOptions = {
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending OTP');
    } else {
      console.log(otpStorage.get(email))
      console.log('Email sent:', info.response);
      res.status(200).send('OTP sent successfully');
    }
  });
};



const confirmPassword=async(req,res)=>{
  try{
     const {email,otp}=req.body;
    
     if(otpStorage.get(email)===otp)
     {  
       otpStorage.delete(email)
       return res.status(201).json({open:true,message:"Re-enter new password"});
     }
     res.status(403).json({open:false,message:"Provide the correct otp"});
  }
  catch(error)
  {
    res.status(500).json({error:error.message})
  }

};
const updatenewPassword=async(req,res)=>{
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
  

    user.password = newPassword;
    user.save();
    res.status(201).json({message:"Updation successfull"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }



};

module.exports = { registerUser, loginUser,forgetPassword ,confirmPassword,updatenewPassword};
