const Course=require("../models/course");
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const { instance } = require("../index.js");
const crypto=require("crypto");
const Payment = require("../models/payment.js");
module.exports.allCourses=wrapAsync(async(req,res)=>{
    let courses= await Course.find();
    res.json({
        courses,
    });
});
module.exports.getCourse=wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const course=await Course.findById(id);
    res.json({
        course,
    });
});
module.exports.getMyCourses=wrapAsync(async(req,res)=>{
    const user =await User.findById(req.session.user._id);
    const courses= await Course.find({_id:user.subscription});
    res.json({
        courses,
    });
});
module.exports.checkout=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const user=await User.findById(req.session.user._id);
    const course=await Course.findById(id);
    if(user.subscription.includes(course._id)){
        return res.status(400).json({
            message:"you have already registered",
        });
    }
   const options={
    amount:Number(course.price*100),
    currency:"INR",
   }
    const order=await instance.orders.create(options);
    res.status(201).json({
        order,
        course,
    });
});
module.exports.paymentVerification = wrapAsync(async (req, res) => {
    const { id } = req.params; // Ensure `id` is always valid
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    // Validate essential fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment details provided." });
    }
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
        // Create a payment entry
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
  
        // Fetch user and course details
        const user = await User.findById(req.session?.user?._id);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
  
        const course = await Course.findById(id);
        if (!course) {
          return res.status(404).json({ message: "Course not found." });
        }
  
        // Update user subscription
        user.subscription.push(course._id);
        await user.save();
  
        res.status(201).json({
          message: "Course purchased successfully",
        });
      }
      else {
        res.status(400).json({
          message:"pleas login first",
        })
      } 
    });
  