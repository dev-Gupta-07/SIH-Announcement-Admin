const Train=require("../models/trainModel")
const Station=require("../models/stationModel")

const createTrain = async (req, res) => {
     const {stationCode, trainName, trainNumber } = req.body;

     try {
       const station = await Station.findOne({ stationCode });

       if (!station) {
         return res.status(404).json({ message: "Station not found" });
       }
       const existingTrain = await Train.findOne({ trainNumber });
       const list=station.trains;
       console.log(list.includes(trainNumber));
       if (existingTrain && list.includes(trainNumber)) {
         return res
           .status(400)
           .json({ message: "Train with the same trainNumber already exists" });
       }
       const newTrain = Train.create({
         stationCode,
         trainName,
         trainNumber,
       });
       station.trains.push(trainNumber);
       await station.save();

       return res
         .status(201)
         .json({ message: "Train created successfully"});
     } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "Server error" });
     }






 //---------------------------------->do later  (if required) --------------------   
//      const {stationCode, trainName, trainNumber } = req.body;

//      if (!stationCode ||!trainName || !trainNumber) {
//        return res.status(400).json({ message: "Please enter all the fields" });
//      }
//   try {
   

//     const train = await Train.create({
//       trainName,
//       trainNumber,
//     });
//     try{
//       const done=await Station.findOne(stationCode,{$push:{trains:train.trainNumber}})
//       if(done)
//       {
//         res.status(200).json({message:"Train created successfully"})
//       }
    
//     }
//     catch(error)
//     {
//         res.status(500).json({error:error.message});
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
};

 // ----------------------------CHECK THIS LATER SOME MISHAppening-------------------------
// const updateTrain = async (req, res) => {
//   try {
//     const updatedTrain = await Train.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedTrain) {
//       return res
//         .status(404)
//         .json({ message: `No train with id: ${req.params.id}` });
//     }
//     res.status(200).json({
//       message: "Train updated successfully",
//       updatedTrain: updatedTrain,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllTrains = async (req, res) => {
//   try {
//     const allTrains = await Train.find();
//     res.status(201).json({
//       message: "All train list provided successfully",
//       allTrains: allTrains,
//     });
//   } catch (error) {
//     res.staus(500).json({ error: error.message });
//   }
// };
// const getTrain = async (req, res) => {
//   try {
//     const train= await Train.findById(req.params.id);
//     if (!train) {
//       return res
//         .status(404)
//         .json({ message: `No train with id: ${req.params.id}` });
//     }
//     res.status(201).json({
//       message: "Train provided successfully",
//       train: train,
//     });
//   } catch (error) {
//     res.status(500).json({ eror: error.message });
//   }
// };
const deleteTrain= async (req, res) => {
    const stationCode=req.body.stationCode;
    const trainNumber=req.body.trainNumber;
    console.log(stationCode)
  try {
      const train=await Train.findOne({stationCode,trainNumber});
         if (!train) {
           return res.status(404).json({
             message: "Train not found for the specified station",
           });
         }
   
   
      try{
        const station = await Station.findOne({ stationCode });

        if (!station) {
          return res.status(404).json({
            message: "Station not found",
          });
        }

    station.trains = station.trains.filter((trainNo) => trainNo !== trainNumber);

    await station.save();

    
    await Train.findByIdAndDelete(train._id);

    return res.status(200).json({
      message: "Train deleted successfully",
    });
    
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTrainAnnouncement=async(req,res)=>{
 const stationCode = req.body.stationCode;
 const trainNumber = req.body.trainNumber;
 const announcementText = req.body.trainAnnouncement;
 try{
  const station = await Station.findOne({ stationCode });

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    const train = await Train.findOne({stationCode,trainNumber });

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    const isTrainAssociated = station.trains.includes(trainNumber);

    if (!isTrainAssociated) {
      return res.status(400).json({ message: 'Train is not associated with the station' });
    }
    train.trainAnnouncements.push(announcementText);
    await train.save();

    return res.status(201).json({ message: 'Announcement added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports={createTrain,deleteTrain,addTrainAnnouncement}