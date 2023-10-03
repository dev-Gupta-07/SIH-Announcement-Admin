const {
  createStation,
  updateStation,
  getAllStations,
  getStation,
  deleteStation,
  getStationMaster,
  addOtherAnnouncement,
  getAllTrainsForStation,
} = require("../controllers/stationController");
const express = require("express");
const router = express.Router();
router.route("/").post(createStation);
router.route("/:id").put(updateStation);
router.route("/").get(getAllStations);
router.route("/:id").get(getStation);
router.route("/:id").delete(deleteStation);
router.route("/find/stationmaster").get(getStationMaster);
router.route("/addoa").post(addOtherAnnouncement);
router.route("/find/getTrainsForStation").get(getAllTrainsForStation);
module.exports = router;
