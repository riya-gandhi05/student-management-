const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subject",
        required:true
    },

    examType:{
        type:String,
        required:true
    },

    marks:{
        type:Number,
        required:true
    }

});

marksSchema.index(
    { student:1, subject:1, examType:1 },
    { unique:true }
);

module.exports = mongoose.model("marks", marksSchema);