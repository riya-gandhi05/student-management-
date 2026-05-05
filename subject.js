const subjectModel = require("./models/subject.model");
const userModel = require("./models/user.model");

module.exports = (app)=>{

app.post("/api/subjects", async (req,res)=>{

    const {subjectName,teacherId,exams} = req.body;

    const teacher = await userModel.findById(teacherId);

    if(!teacher || teacher.role !== "teacher"){

        return res.send({
            status:0,
            message:"Invalid teacher"
        });

    }

    const subject = new subjectModel({
        subjectName,
        teacher:teacherId,
        exams
    });

    await subject.save();

    res.send({
        status:1,
        message:"Subject created"
    });

});


app.get("/api/subjects", async (req,res)=>{

    const subjects = await subjectModel.find().populate("teacher");

    res.send({
        status:1,
        data:subjects
    });

});

};

//added jenkinfile 
//made the changes 
