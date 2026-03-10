// let express=require('express')
// let mongoose=require('mongoose');
// require('dotenv').config();
// let app=express();
// const userModel = require('./models/user.model');

// app.use(express.json())

// app.post("/api/register-insert",(req,res)=>{
//     let {sName,sRole,sEmail,sPassword}=req.body;
//     let register=new userModel({
//         name:sName,
//         email:sEmail,
//         role:sRole,
//         password:sPassword
//     })
//     register.save().then(()=>{
//         res.send({
//             stauts:1,
//             message:"you successfully registered"
//         });
//     }).catch((err)=>{
//         res.send({
//             status:1,
//             message:"registeration failed"
//         });
//     })
// })

// app.get("/api/register-read",async(req,res)=>{
//     let registerRead=await registerModel.find();
//     res.send({
//         status:1,
//         message:"register-list",
//         data:registerRead
//     })
// })

// app.delete("/api/register-delete/:id",async(req,res)=>{
//     let registerId=req.params.id;
//     let deleteRegister=await userModel.deleteMany({_id:registerId});
//     res.send({
//         stauts:1,
//         message:"data delete",
//         id:registerId,
//         delRegister:deleteRegister
//     })

// })

// app.put("/api/register-update/:id",async (req,res)=>{
//     let userId=req.params.id;
//     let{sName,sEmail,sTeacher,sStudent,sPassword}=req.body;
//     let updateObj={
//         name:sName,
//         email:sEmail,
//         password:sPassword,
//         role:sRole
//     }
//     let updateRes=await userModel.updateMany({_id:userId},updateObj);
//     res.send({
//         status:1,
//         message:"update successfully",
//         id:userId
//     })
// })

// mongoose.connect(process.env.PORT).then(()=>{
//     console.log("connected to mongodb");
//     app.listen(process.env.port,()=>{
//         console.log("server is running");
//     })
// })