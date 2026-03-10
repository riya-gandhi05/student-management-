
let mongoose=require('mongoose');


let subjectSchema=mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },

   teacher: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true
},
exams: [
   {
      examType: String,
      maxMarks: Number,
      weightage: Number   // ratio calculation ke liye
   }
]

})

let subjectModel=mongoose.model("subject",subjectSchema)
module.exports=subjectModel