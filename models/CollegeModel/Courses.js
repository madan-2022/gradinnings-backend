const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    overview:{
        type:String
        
    },
    tables:[{
        type:Array
    }]
})

const Course = mongoose.model("Course",CourseSchema)

module.exports=Course;