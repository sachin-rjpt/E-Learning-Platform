const mongoose=require("mongoose");
const courseScheam=new mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
  description :{
     type:String,
     required:true,
  },
  image:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  duration :{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  createdBy:{
    type:String,
    requierd:true,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});
const Course =mongoose.model("Course",courseScheam);
module.exports=Course;