const customError = require("../utils/expressError")
module.exports.isAuth=async(req,res,next)=>{
    if(typeof req.session.user==='undefined'||typeof req.session.user._id==='undefined')
      return next(new customError(400,"first login"));
    next();
}