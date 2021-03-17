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
    console.log("in save");
    savedNotes.push(req.body);
    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) throw err;
      return res.json(true);
  });
})
}