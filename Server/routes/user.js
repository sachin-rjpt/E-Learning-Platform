const express=require("express");
const controller=require("../controllers/user.js");
const { isAuth } = require("../middleware/isAuth.js");
const router=express.Router();

router.post("/register",controller.register);
router.post("/verify",controller.verifyRegistraton);
router.post("/login",controller.login);
router.get("/profile",isAuth,controller.profile);
router.get("/logout",isAuth,controller.logout);
module.exports=router;