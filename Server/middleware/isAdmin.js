const User=require("../models/user.js");
const customError=require("../utils/expressError.js");
module.exports.isAdmin=async(req,res,next)=>{
        const user=await User.findById(req.session.user._id);
        if(user.role=="admin")
           next();
        else {
            next(new customError(403,"access denied"));
        }  
    }