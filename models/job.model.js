const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        enum:["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"],
        required:true,
    }
})

const JobPost = mongoose.model("JobPost", jobSchema);

module.exports = JobPost;