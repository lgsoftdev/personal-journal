const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getTelAddsByChar = (char) => {
  const sql = `
        SELECT * FROM teladds
        WHERE lower(name) like '${String(char).toLowerCase()}%' 
    `;
  const rows = db.prepare(sql).all();
  console.log(rows);
  return rows;
};

app.get('/teladds/:char', (req, res) => {
  const char = req.params.char;
  const data = getTelAddsByChar(char);
  res.send(data);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
