const mongoose = require('mongoose')

const ScholarshipSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Scholarship = mongoose.model("Scholarship",ScholarshipSchema)

module.exports=Scholarship;