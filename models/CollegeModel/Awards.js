const mongoose = require('mongoose')

const AwardsSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Awards = mongoose.model("Awards",AwardsSchema)

module.exports=Awards;