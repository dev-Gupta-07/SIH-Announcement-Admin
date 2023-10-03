const User = require("../models/userModel");

const getAllUsers=async(req,res)=>{
  try{
    const allusers=await User.find();
    res.status(201).json({
        message:"All current station masters list provided successfully",
        allusers:allusers});
  }
  catch(error)
  {
    res.staus(500).json({error:error.message});
  }

};

const getUser=async(req,res)=>{ 
    try{
        const user=await User.findById(req.params.id);
        if(!user)
        {
             return res.status(404).json({ message: `No station master with id: ${req.params.id}` });
        }
        res.status(201).json({
            message:"Station master provided successfully",
            user:user});
    }
    catch(error)
    {
        res.status(500).json({eror:error.message})
    }
};
const updateUser=async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
         if (!updatedUser) {
           return res
             .status(404)
             .json({ message: `No station master with id: ${req.params.id}` });
         }
        res.status(200).json(
            {
            message:"User updated successfully",
            updatedUser:updatedUser
            }
        );
    }
    catch(error)
    {
       res.status(500).json({ error: error.message });
    }
}
const deleteUser=async(req,res)=>{
     try {
        const deletedUser=await User.findByIdAndDelete(req.params.id);
         if (!deletedUser) {
           return res
             .status(404)
             .json({ message: `No station master with id: ${req.params.id}` });
         }
          res.status(200).json({
            message: "User deleted successfully",
          });
        
    
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
}


module.exports={getAllUsers,getUser,updateUser,deleteUser};