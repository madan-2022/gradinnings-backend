const mongoose = require('mongoose')

const CutoffSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Cutoff = mongoose.model("Cutoff",CutoffSchema)

module.exports=Cutoff;