const Station=require("../models/stationModel")
const Train=require("../models/trainModel")


//      station banaega   super admin------------------
const createStation = async (req, res) => {
  try {
    const {stationName, stationCode } = req.body;

    if (!stationName || !stationCode) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const stationExists = await Station.findOne({stationCode});
    if (stationExists) {
      return res.status(400).json({ message: "Station already exists" });
    }

    const station = await Station.create({
      stationName,
      stationCode,
    });

    if (station) {
      res.status(201).json({ message: "Station created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create the station" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  station update  super admin------------------
const updateStation= async (req, res) => {
  try {
    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedStation) {
      return res
        .status(404)
        .json({ message: `No station  with id: ${req.params.id}` });
    }
    res.status(200).json({
      message: "Station updated successfully",
      updatedStation: updatedStation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// sare station super admin ko pahuch do fir id mile fir update/delete kar pae
const getAllStations = async (req, res) => {
  try {
    const allStations = await Station.find();
    res.status(201).json({
      message: "All current station  list provided successfully",
      allStations: allStations,
    });
  } catch (error) {
    res.staus(500).json({ error: error.message });
  }
};
// singly agar
const getStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res
        .status(404)
        .json({ message: `No station with id: ${req.params.id}` });
    }
    res.status(201).json({
      message: "Station provided successfully",
      station:station,
    });
  } catch (error) {
    res.status(500).json({ eror: error.message });
  }
};

//  station delete  super admin------------------
const deleteStation = async (req, res) => {
  try {
    const deletedStation = await Station.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res
        .status(404)
        .json({ message: `No station with id: ${req.params.id}` });
    }
    res.status(200).json({
      message: "Station deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// station master ko milega station code jab login karwaenge phir usse sari other announcement pahuchegi
const getStationMaster = async (req, res) => {
  try {
    console.log("aa")
    const stationCode=req.body.stationCode;
    console.log(stationCode)
    const station = await Station.findOne({ stationCode: stationCode });
    if (!station) {
      return res
        .status(404)
        .json({ message: `No station with stationcode ${stationCode}` });
    }
    res.status(201).json({
      message: "Station provided successfully",
      station: station,
    });
  } catch (error) {
    res.status(500).json({ eror: error.message });
  }
};

// announcement add kar rha particular station ka others wala
const addOtherAnnouncement=async(req,res)=>{
    const stationCode=req.body.stationCode;
    const announcementText=req.body.otherAnnouncement;
    try{
        const station=await Station.findOne({stationCode});
        if (!station) {
          return res.status(404).json({ message: "Station not found" });
        }// halaki wo mil jaega
        station.otherAnnouncements.push(announcementText);
        await station.save();
        return res.status(201).json({ message: 'Announcement added successfully'});
    }
    catch(error)
    {
         res.status(500).json({ eror: error.message });
    }

}

//client stationCode dale to sare train de dunga aur frontened mein uske dale hue train number pe filter karunga
const getAllTrainsForStation=async(req,res)=>{
    const stationCode = req.body.stationCode;
     try {
    
    const station = await Station.findOne({ stationCode });

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    const trainNumbers = station.trains;
    const trains = await Train.find({ trainNumber: { $in: trainNumbers } });
    const stationTrains=trains.filter((train)=>train.stationCode==stationCode)
    return res.status(200).json({ stationTrains });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports={createStation,updateStation,getAllStations,getStation,deleteStation,getStationMaster,addOtherAnnouncement,getAllTrainsForStation}



