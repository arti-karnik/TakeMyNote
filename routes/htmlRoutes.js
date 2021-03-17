var path = require("path");

module.exports = function(app){

  app.get("/notes", (req, res) => {
    console.log(`im notes`);
    res.sendFile(path.join(__dirname, "../public/notes.html"))
  })

  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })
}