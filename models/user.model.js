let mongoose=require('mongoose');

let userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    role: {
        type: String,
        enum: ["student", "teacher","admin"],
        required: true
    }


});
    


let userModel=mongoose.model("user",userSchema)
module.exports=userModel