const attendanceModel = require("./models/attendance.model");
const enrollmentModel = require("./models/enrollment.model");
const userModel = require("./models/user.model");
const subjectModel = require("./models/subject.model");

module.exports = (app) => {


app.post("/api/attendance", async (req,res)=>{

    try{

        const {studentId, subjectId, date, status} = req.body;

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

        const existing = await attendanceModel.findOne({
            student:studentId,
            subject:subjectId,
            date:new Date(date)
        });

        if(existing){

            existing.status = status;
            await existing.save();

            return res.send({
                status:1,
                message:"Attendance updated"
            });

        }

        const attendance = new attendanceModel({
            student:studentId,
            subject:subjectId,
            date,
            status
        });

        await attendance.save();

        res.send({
            status:1,
            message:"Attendance marked"
        });

    }catch(err){

        res.send({
            status:0,
            message:"Error marking attendance"
        });

    }

});




app.get("/api/attendance/student/:studentId", async (req,res)=>{

    const records = await attendanceModel
    .find({student:req.params.studentId})
    .populate("subject");

    const totalClasses = records.length;
    const present = records.filter(r => r.status === "Present").length;

    const percentage = totalClasses > 0 ? (present/totalClasses)*100 : 0;

    res.send({
        status:1,
        totalClasses,
        present,
        percentage:percentage.toFixed(2),
        records
    });

});

};