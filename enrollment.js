const enrollmentModel = require("./models/enrollment.model");
const userModel = require("./models/user.model");
const subjectModel = require("./models/subject.model");

module.exports = (app) => {



app.post("/api/enroll", async (req,res)=>{

    try{

        const {studentId, subjectId} = req.body;

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

        const already = await enrollmentModel.findOne({
            student:studentId,
            subject:subjectId
        });

        if(already){
            return res.send({
                status:0,
                message:"Student already enrolled"
            });
        }

        const enroll = new enrollmentModel({
            student:studentId,
            subject:subjectId
        });

        await enroll.save();

        res.send({
            status:1,
            message:"Enrollment successful"
        });

    }catch(err){

        res.send({
            status:0,
            message:"Enrollment failed"
        });

    }

});




app.get("/api/enroll/subject/:subjectId", async (req,res)=>{

    const students = await enrollmentModel
    .find({subject:req.params.subjectId})
    .populate("student");

    res.send({
        status:1,
        data:students
    });

});


/* ========= STUDENT SUBJECTS ========= */

app.get("/api/enroll/student/:studentId", async (req,res)=>{

    const subjects = await enrollmentModel
    .find({student:req.params.studentId})
    .populate("subject");

    res.send({
        status:1,
        data:subjects
    });

});

};