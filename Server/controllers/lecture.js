const Lecture = require("../models/lecture");
const User=require("../models/user.js");
const customError = require("../utils/expressError");
module.exports.allLectures=async(req,res,next)=>{
    const {courseId}=req.params;
    const user=await User.findById(req.session.user._id);
  
  if(user.role==="admin"||user.subscription.includes(courseId)){
    const lectures= await Lecture.find({course:courseId});
    return res.json({
        lectures,
    });
  }
else {
    next(new customError(400,"you have not subscribed this course"));
}
}

module.exports.getLecture=async(req,res,next)=>{
    const {id,lec_id}=req.params;
   const user =await User.findById(req.session.user._id);
   if(user.role==="admin"||user.subscription.includes(id)){
      const lecture=await Lecture.findById(lec_id);
      res.json({
         lecture,
      })
   }
   else {
       next(new customError(400,"you have not subscribed this course"));
   }
}