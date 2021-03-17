'use strict';

const fs = require("fs");
const db = require('../db/db.json');
const path = require('path');
var savedNotes;

module.exports = function(app){

  app.get("/api/notes", (req, res) => {
      savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      res.json(savedNotes);
  })

  app.post("/api/notes", (req, res) => {
    let addNote = req.body;
    if (savedNotes.length > 0) {
      addNote.id = savedNotes.length + 1; 
    }

    savedNotes.push(addNote);

    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) throw err;
      return res.json(true);
  });
})

app.delete("/api/notes/:id", (req, res) => {
  console.log("in delete" + req.params.id);

  savedNotes = savedNotes.filter(function(jsonObject) {
    return jsonObject.id != req.params.id;
  });

  console.log("after delete" + savedNotes);

//  savedNotes.splice(req.params.id, 1);
  fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
    if (err) throw err;
    return true;
});
    console.log("Deleted note with id "+ req.params.id);
    res.json(savedNotes);
})
}


