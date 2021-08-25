const mongoose = require('mongoose');

const stationerySchema = new mongoose.Schema({
    StationeryId:{
        type:String,
        required:true,
        unique:true
    },

    Title:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    
    Img: {
        type: String
        
    },

   
   


});
//send data from this model to database, export module for routes

module.exports = mongoose.model('stationerys',stationerySchema);//docname name stationerys , schema name as a parameter