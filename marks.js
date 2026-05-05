const marksModel = require("./models/marks.model");
const enrollmentModel = require("./models/enrollment.model");
const subjectModel = require("./models/subject.model");
const userModel = require("./models/user.model");

module.exports = (app)=>{

app.post("/api/marks", async (req,res)=>{

    const {studentId,subjectId,examType,marks} = req.body;

    const student = await userModel.findById(studentId);

    if(!student || student.role !== "student"){

        return res.send({
            status:0,
            message:"Invalid student"
        });

    }

    const subject = await subjectModel.findById(subjectId);

    if(!subject){

        return res.send({
            status:0,
            message:"Subject not found"
        });

    }

    const enrollment = await enrollmentModel.findOne({
        student:studentId,
        subject:subjectId
    });

    if(!enrollment){

        return res.send({
            status:0,
            message:"Student not enrolled"
        });

    }

    const newMarks = new marksModel({
        student:studentId,
        subject:subjectId,
        examType,
        marks
    });

    await newMarks.save();

    res.send({
        status:1,
        message:"Marks added"
    });

});

};




