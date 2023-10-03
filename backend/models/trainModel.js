const mongoose=require('mongoose');

const trainSchema = mongoose.Schema({
 stationCode:{
    type:String,
    required:true,
 },
  trainName: {
    type: String,
    required: true,
  },
  trainNumber: {
    type: String,
    required: true,
  },
  trainAnnouncements: {
    type: [String],
    default: [],
  },
});
const Train = mongoose.model("Train",trainSchema);
module.exports = Train;