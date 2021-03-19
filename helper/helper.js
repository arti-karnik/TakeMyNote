
/// Method to read from Database
function readFromDB(filename) {
    try {
      const data = fs.readFileSync(filename, 'utf8')
      return JSON.parse(data);
    } catch (err) {
      console.error(err)
      return null
    }
}
/// Method to write to Database
function writeToDB() {
    fs.writeFile("./db/db.json",JSON.stringify(savedNotes,'\t'),err => {
      if (err) {
        throw err;
      } 
      return true;
    });
}
/// Method to delete from Database
function deleteFromArray(array, id) {
    return array = array.filter(function(jsonObject) {
      return jsonObject.id != id;
    });
}
/// Method to get unique ID from Database
function getUniqueIdFromDB(db) {
    if (db.length > 0) {
      return db[db.length - 1].id + 1
    }
}
/// Method to update note from Database
function updateDB(id, title, text, db) {
    for (var i=0; i<db.length; i++) {
      if (db[i].id == id) {
        db[i].title = title;
        db[i].text = text;
      }
    }
return db;
}