console.log(__dirname);

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../TakeMyNote/public/index.html')));
console.log(path.join(__dirname, '../TakeMyNote/public/index.html'));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../TakeMyNote/public/notes.html')));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

