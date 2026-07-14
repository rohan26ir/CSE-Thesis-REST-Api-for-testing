const express = require("express");
const noteModel = require("./models/note.model")


const app = express();
app.use(express.json);  // middleware


// POST 
// GET
// DLETE
// PATCH

// POST Oparation
app.post("/notes", async (req, res) => {

  const data = req.body /*  title, description */
  await noteModel.create({ 
    title:data.title,
    descriiption: data.descriiption

   })
   res.status(201).json({
     message: "Note Created"
   })
})

// GET oparation
app.get("/notes", async (req, res) => {

  await noteModel.find(); 

  res.status(200).json({
    message: "Note fetch successfully",
    notes: notes
  })
})

// DELETE 
app.delete("/notes/:id", async(req, res) => {

  const id = req.params.id

  await noteModel.findByIdAndDelete({
    _id: id
  })
  res.status(200).json({
    message: "Delete Successfully",
  })
})

// Patch
app.patch("/notes/:id", async(req, res)=> {

  const id = req.params.id

  await noteModel.findOneAndUpdate({
    _id : id 
  },
  {
    description: description
  })

  res.status(200).json({
    message: "Note update successfully"
  })
})


module.exports = app;