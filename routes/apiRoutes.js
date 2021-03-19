'use strict';
const fs = require("fs");
const db = require('../db/db.json');
const path = require('path');
var savedNotes;

module.exports = function(app){

  //===  API get call to retrieve saved notes in db.json ==//
  app.get("/api/notes", (req, res) => {
      console.log("Get notes from db");
      savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      res.json(savedNotes);
  })

    //===  API POST call to save notes in db.json ==//

  app.post("/api/notes", (req, res) => {
    let addNote = req.body;
    if (savedNotes.length > 0) {
      addNote.id = savedNotes[savedNotes.length - 1].id + 1; 
    }
    savedNotes.push(addNote);
    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) throw err;
      return res.json(true);
    });
    console.log("saved note");
})

  //===  API DELETE call to delete selected notes from db.json ==//

  app.delete("/api/notes/:id", (req, res) => {
  savedNotes = savedNotes.filter(function(jsonObject) {
    return jsonObject.id != req.params.id;
  });
  fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
    if (err) throw err;
    return true;
});
    console.log("Deleted note with id "+ req.params.id);
    res.json(savedNotes);
})

  //===  API PUT call to update selected notes from db.json ==//
  app.put("/api/notes/update/:id", (req, res) => {
  for (var i=0; i<savedNotes.length; i++) {
    if (savedNotes[i].id == req.params.id) {
      savedNotes[i].title = req.body.title;
      savedNotes[i].text = req.body.text;
    }
  }
  fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
    if (err) throw err;
    return true;
  });
    console.log("updated  note with id "+ req.params.id);
    return res.json(savedNotes);
})
}



