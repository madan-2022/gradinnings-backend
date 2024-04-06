const mongoose = require('mongoose')

const PlacementSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Placement = mongoose.model("Placement",PlacementSchema)

module.exports=Placement;