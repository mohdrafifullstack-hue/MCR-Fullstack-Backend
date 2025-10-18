const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"JobPost"
    },
    salary:{
        type:Number,
        min:0,
    },
    description:{
        type:String,
    },
    qualification:[
        {
            type:String
        }
    ]
})

const Details = mongoose.model("Details", detailSchema);

module.exports = Details