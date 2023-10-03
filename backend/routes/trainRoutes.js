const {
  createTrain,
  deleteTrain,
  addTrainAnnouncement
} = require("../controllers/trainController");
const express = require("express");
const router = express.Router();
router.route("/").post(createTrain);
router.route("/").delete(deleteTrain)
router.route("/addtrainAnnounce").post(addTrainAnnouncement)
module.exports = router;
