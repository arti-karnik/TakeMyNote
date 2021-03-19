'use strict';
const fs = require("fs");
const db = require('../db/db.json');
const path = require('path');
var savedNotes;

module.exports = function (app) {

  //===  API get call to retrieve saved notes in db.json ==//
  app.get("/api/notes", (req, res) => {
    console.log("Get notes from db");
    
    try {
      const data = fs.readFileSync('./db/db.json', 'utf8')
      savedNotes =  JSON.parse(data);
    } catch (err) {
      throw err;    
    }
    console.log("Retrieve Notes ");
    return res.json(savedNotes);
  })

  //===  API POST call to save notes in db.json ==//
  app.post("/api/notes", (req, res) => {
    let addNote = req.body;
    if (savedNotes.length > 0) {
      addNote.id = savedNotes[savedNotes.length - 1].id + 1
    } 
    savedNotes.push(addNote);
    console.log("Saving note with id: " + addNote.id);
    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) {
        throw err;
      } 
      return true;
    });

    return res.json(true);
  })

  //===  API DELETE call to delete selected notes from db.json ==//
  app.delete("/api/notes/:id", (req, res) => {
    savedNotes = savedNotes.filter(function(jsonObject) {
      return jsonObject.id != req.params.id;
    });
    console.log("Deleting note with id " + req.params.id);
    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) {
        throw err;
      } 
    });

    return res.json(true);
  })

  //===  API PUT call to update selected notes from db.json ==//
  app.put("/api/notes/update/:id", (req, res) => {
    console.log("id: "+ req.params.id);
    try {
      const data = fs.readFileSync('./db/db.json', 'utf8')
      savedNotes =  JSON.parse(data);
    } catch (err) {
      throw err;    
    }
    for (var i=0; i<savedNotes.length; i++) {
      if (savedNotes[i].id == req.body.id) {
        savedNotes[i].title = req.body.title;
        savedNotes[i].text = req.body.text;
      }
    }

    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) {
        throw err;
      } 
    });

    return res.json(true);
  })
}












