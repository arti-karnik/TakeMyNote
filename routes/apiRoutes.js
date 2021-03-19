'use strict';
const fs = require("fs");
const db = require('../db/db.json');
const helper = require('../helper/helper');
const path = require('path');
var savedNotes;

module.exports = function (app) {

  //===  API get call to retrieve saved notes in db.json ==//
  app.get("/api/notes", (req, res) => {
    console.log("Get notes from db");
    savedNotes = readFromDB('./db/db.json');
    console.log("Retrieve Notes ");
    res.json(savedNotes);
  })

  //===  API POST call to save notes in db.json ==//
  app.post("/api/notes", (req, res) => {
    req.body.id = getUniqueIdFromDB(savedNotes);
    savedNotes.push(req.body);
    console.log("Saving note");
    return res.json(writeToDB());
  })

  //===  API DELETE call to delete selected notes from db.json ==//
  app.delete("/api/notes/:id", (req, res) => {
    savedNotes = deleteFromArray(req.params.id);
    console.log("Deleting note with id " + req.params.id);
    writeToDB();
  })

  //===  API PUT call to update selected notes from db.json ==//
  app.put("/api/notes/update/:id", (req, res) => {
    savedNotes = updateDB(req.params.id, req.body.title, req.body.text);
    console.log("Updating note with id " + req.params.id);
    return res.json(writeToDB());
  })
}







