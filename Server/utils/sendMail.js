const nodemailer = require("nodemailer");
const wrapAsync =require("../utils/wrapAsync.js");
module.exports.sendMail= wrapAsync(async(to,subject,text)=>{
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user:process.env.GMAIL,
    pass:process.env.APP_PASS,
  },
});
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.GMAIL, // sender address
    to:to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: `<b>${text}<b>`, // html body
  });
});
