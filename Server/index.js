const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const Razorpay=require("razorpay");
app.use(cookieParser());
// to access .env;
require('dotenv').config();
//const MongoStore=require("connect-mongo");
//razorpay instance 
module.exports.instance=new Razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_SECRET,
});
const cors=require("cors");
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React frontend's URL
  credentials: true, // Allow credentials (cookies) to be sent
}));
const path = require('path');
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/home",(req,res)=>{
    console.log("request recieved");
    res.send("home page");
});
const session=require("express-session");
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const {main}=require("./config/db.js");
const userRoutes=require("./routes/user.js");
const courseRoutes=require("./routes/course.js");
const adminRoutes=require("./routes/admin.js");
const lectureRoutes=require("./routes/lecture.js");
app.listen(process.env.PORT,(req,res)=>{
    console.log("server is started");
});
main()
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log(err);
});
// express session ;
app.use(
    session({
      secret: process.env.SECRET, // Used to sign the session ID cookie
      resave: false,            // Prevents resaving unchanged sessions
      saveUninitialized: false,  // Saves uninitialized sessions
      // store: MongoStore.create({
      //   mongoUrl: 'mongodb://localhost:27017/ELearning', // Replace with your MongoDB connection string
      //   collectionName: 'sessions', // Collection where sessions will be stored
      // }),
       cookie: {
      secure: false, // Use true in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
       sameSite: 'lax',
      },
    })
  );
// Routes
app.use("/user",userRoutes);
app.use("/course",courseRoutes);
app.use("/admin",adminRoutes);
app.use("/lecture",lectureRoutes);

// middleware for error handling ;
app.use((err,req,res,next)=>{
  // console.log(err);
    let {status=500,message="internal server error"}=err;
  res.status(status).send(message);    
});