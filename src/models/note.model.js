const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema( {

  title: String,
  description: String

})


const noteMOdel = mongoose.model("note", noteSchema);


module.exports = noteMOdel


// for any oparation(CRUD) need to create "model"
// use becouse not repeted code , easy to use