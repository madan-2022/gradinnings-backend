const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Seat = mongoose.model("Seat",SeatSchema)

module.exports=Seat;