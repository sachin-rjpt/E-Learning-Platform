const wrapAsync =require("../utils/wrapAsync.js");
const Course=require("../models/course");
const Lecture=require("../models/lecture.js");
const User=require("../models/user.js");
const customError = require("../utils/expressError.js");
const fs = require('fs');
module.exports.addCourse=wrapAsync(async(req,res)=>{
    let{title,description,category,createdBy,duration,price}=req.body;
    let image=req.file;
    let newCourse=new Course({
        title:title,
        description:description,
        category:category,
        createdBy:createdBy,
        image: image?.path,
        duration:duration,
        price:price,
    });
    await newCourse.save();
   res.json({
      message:"new course added successfully",
   })
});

module.exports.addLecture=wrapAsync(async(req,res,next)=>{
    let {id}=req.params;
    let course=await Course.findById(id);
    if(!course){
       next(new customError(400,"course is not availabel"));
    }
   let {title,description}=req.body;
   let video=req.file;
   let newLecture=new Lecture({
     title:title,
     description:description,
     video:video?.path,
     course:course._id,
   });
   await newLecture.save();
   res.json({
      message:"lecture added successfully",
   })
});
module.exports.deleteLecture=wrapAsync(async(req,res,next)=>{
   let {id}=req.params;
   let lecture= await Lecture.findByIdAndDelete(id);
   if(!lecture){
      next(new customError(400,"lecture not found"));
   }
   else {
      fs.rm(lecture.video,()=>{
         console.log("lecture deleted successfully");
      })
    res.json({
      message:`${lecture.title} is deleted`,
   })
   }
});
module.exports.deleteCourse=wrapAsync(async(req,res,next)=>{
   let {id}=req.params;
   const course= await Course.findById(id);
   if(!course){
      next(new customError(400,"course not found"));
   }
   else {
   const lectures=await Lecture.find({course:id});
   // delete lactures of course and it's video;
   lectures.map(async(lecture)=>{
      await Lecture.findByIdAndDelete(lecture._id);
      fs.rm(lecture.video,()=>{
         console.log("video is deleted");
      });
   });
   // delete course and it's image;
   await Course.findByIdAndDelete(id);
   fs.rm(course.image,()=>{
       console.log("course image is deleted");
   });
   // remove it from user's subscription;
   await User.updateMany({},{$pull:{subscription:id}});
   res.json({
      message:`${course.title} is deleted`,
   })
}
});
module.exports.getAllStats=wrapAsync(async(req,res)=>{
   const totalCourses=(await Course.find()).length;
   const totalLectures=(await Lecture.find()).length;
   const totalUsers=(await User.find()).length;
   const stats={
      totalCourses,
      totalLectures,
      totalUsers,
   };
   res.json({
      stats,
   });
});