const mongoose = require('mongoose')

const EligibilitySchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables: {
        type: [[String]] 
    }
})

const Eligibility = mongoose.model("Eligibility",EligibilitySchema)

module.exports=Eligibility;