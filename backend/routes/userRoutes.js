const express = require("express");
const {getAllUsers,getUser,updateUser,deleteUser} = require("../controllers/userController");
const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
module.exports=router;