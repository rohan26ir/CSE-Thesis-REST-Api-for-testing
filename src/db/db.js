const mongoose = require("mongoose")

async function  conectDB() {
  
  // await mongoose.connect(process.env.mongoDB);

  await mongoose.connect("mongodb+srv://backend-learn:BAPrZrtcXXltTcNf@cluster0.t3vfrkp.mongodb.net/?appName=backend-learning");

  console.log("Connected Mongodb");

}


module.exports = conectDB;