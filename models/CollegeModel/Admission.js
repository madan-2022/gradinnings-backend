const mongoose = require('mongoose')

const AdmissionSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Admission = mongoose.model("Admission",AdmissionSchema)

module.exports=Admission;