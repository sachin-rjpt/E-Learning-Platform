const User=require("../models/user.js");
const wrapAsync =require("../utils/wrapAsync.js");
const {sendMail}=require("../utils/sendMail.js");
const bycrpt=require("bcrypt");
const customError=require("../utils/expressError.js");
module.exports.register=wrapAsync(async(req,res,next)=>{
    let {name,email,password}=req.body;
    let user= await User.findOne({email});
     if(user){
       next(new customError(400,"user is already registered"));
     }
    else {   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expireTime=new Date(Date.now()+5*60*1000);
    // storing information in session ;
     req.session.user={name,email,password,otp,expireTime};
    await sendMail(email,"ELearning",`your OTP is ${otp} and it is valid for 5 minute`);
    res.json({
      message:"otp sent successfully ",
    });
  }
});
module.exports.verifyRegistraton=wrapAsync(async(req,res,next)=>{
  // if user is not in this session ;
    if( typeof req.session.user==="undefined"){
       next(new customError(400,"first enter your email and password to register"));
    }
    else {
     
    let {email,otp}=req.body;
    let user= await User.findOne({email});
    if(user){
      next(new customError(400,"user is already registered"));
    }
    else {
      const expireTime = new Date(req.session.user.expireTime);
    if(email!=req.session.user.email||otp!=req.session.user.otp)
      next(new customError(400,"wrong OTP"));
   else if(expireTime<new Date())
      next(new customError(400,"OTP expired"));
  else {
    const hashedPassword=await bycrpt.hash(req.session.user.password,10);
      let newUser=new User({
        name:req.session.user.name,
        email:req.session.user.email,
        password:hashedPassword,
      });
     await newUser.save();
     res.json({
       user:newUser,
      message :"successfully registered",
     })
  }
}
    }
});
module.exports.login=wrapAsync(async(req,res,next)=>{
  let {email,password}=req.body;
   let user=await User.findOne({email});
   if(!user){
   return next(new customError(400,"wrong email or password") );
   }
   let isCorrect= await bycrpt.compare(password,user.password)
  if(!isCorrect)
   return next(new customError(400,"incorrect password"));
  else {
      req.session.user={_id:user._id,email,password}
      res.json({
        user,
      });
  }
});
module.exports.profile=wrapAsync(async(req,res)=>{
      let user=await User.findById(req.session.user._id);
      res.json({
        user,
      });
});
module.exports.logout=wrapAsync(async(req,res,next)=>{
     req.session.destroy((err)=>{
      if(err){
        next(new customError(500,"failed to logout"));
      }
      res.clearCookie("connect.sid");
       res.json({
        message:"successfully logout",
       })
     });
});


