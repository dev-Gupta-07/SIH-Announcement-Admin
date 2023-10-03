const mongoose = require("mongoose");

const stationSchema=mongoose.Schema({
    stationName:{
        type:String,
        required:true,
    },
    stationCode:{
        type:String,
        required:true,
    },
    trains:{
        type:[String],
    },
    otherAnnouncements:{
        type:[String],
        default:[]
    }

});

const Station=mongoose.model("Station",stationSchema);
module.exports=Station;