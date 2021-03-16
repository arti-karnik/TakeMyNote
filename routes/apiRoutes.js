
const fs = require("fs");
const notes = require('../db/db.json');

module.exports = function(app){
  app.get("/api/notes", (req, res)=>{
    console.log(notes);
    return res.json(notes)
  });
  app.post('/api/notes', function(req, res) {
    console.log("in POST");

    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {

      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(userNotes);
      let number = 1;
      console.log("in POST 1");

      dbData.forEach((note, index) => {
        note.id = number;
        number++;
        console.log("in POST 2");
        return dbData;
      });
      console.log("in POST 3");

      console.log(dbData);

      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) {    console.log("in error");
        throw err;
      }
      });
      res.send('Note saved..');
    });
  });

}