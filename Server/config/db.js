require('dotenv').config();
const mongoose=require("mongoose");
  async function main(){
    await mongoose.connect(process.env.DATABASE);
}
module.exports={main};