const express=require("express");
const router=express.Router();
const Controller=require("../controllers/lecture.js");
const { isAuth } = require("../middleware/isAuth.js");
router.get("/:id/:lec_id",isAuth,Controller.getLecture);
router.get("/:courseId",isAuth,Controller.allLectures);
module.exports=router;