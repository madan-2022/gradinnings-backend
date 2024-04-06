const mongoose = require('mongoose')

const HighlightSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables: {
        type: [[String]] 
    }
})

const Highlight = mongoose.model("Highlight",HighlightSchema)

module.exports=Highlight;