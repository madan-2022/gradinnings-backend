const mongoose = require('mongoose')

const CampusSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Campus = mongoose.model("Campus",CampusSchema)

module.exports=Campus;