const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
       const id=uuidv4();
       const fileExten=file.originalname.split(".").pop();
       fileName=`${id}.${fileExten}`;
      cb(null, fileName);
    }
  })
  
module.exports.uploadFile=multer({ storage: storage }).single("file");
