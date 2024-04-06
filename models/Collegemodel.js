const mongoose = require('mongoose')

const Highlight = require('../models/CollegeModel/Highlights')
const Courses = require('../models/CollegeModel/Courses')
const Admission = require('../models/CollegeModel/Admission')
const Cutoff = require('../models/CollegeModel/Cutoff')
const Placement = require('../models/CollegeModel/Placement')
const Scholarship = require('../models/CollegeModel/Scholarship')
const Campus = require('../models/CollegeModel/Campus')
const Award = require('../models/CollegeModel/Awards')
const Awards = require('../models/CollegeModel/Awards')
const Seat = require('../models/CollegeModel/Seat')
const Eligibility = require('../models/CollegeModel/Eligibility')


const Collegeschema = new mongoose.Schema({
    name:{
        type:String
    },
    overview:{
        type:Object
    },
    coursesarray:{
        type:Array
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    fee:{
        type:Array
    },
    Logo:{
        type:String
    },
    Banner:{
        type:String
    },
    url:{
        type:String
    },

    Highlight:[Highlight.schema],
    Courses:[Courses.schema],
    Admission:[Admission.schema],
   
    Cutoff:[Cutoff.schema],
    Placement:[Placement.schema],
    Scholarship:[Scholarship.schema],
    Campus:[Campus.schema],
    Award:[Awards.schema],
    Seat:[Seat.schema],
    Eligibility:[Eligibility.schema]




})

const College = mongoose.model("College",Collegeschema);
module.exports=College;