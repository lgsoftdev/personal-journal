const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const query = require('./statements');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/teladds/:char', (req, res) => {
  const char = req.params.char;
  const data = query.getTelAddsByChar(char);
  res.send(data);
});

// This route handler provides ability to create a new address entry.
app.post('/teladds', async (req, res) => {
  const { name, address, phone, mobile, email, website } = req.body;
  query.insertIntoTelAddsTable(
    name,
    utils.setNullIfEmpty(address),
    utils.setNullIfEmpty(phone),
    utils.setNullIfEmpty(mobile),
    utils.setNullIfEmpty(email),
    utils.setNullIfEmpty(website)
  );
  res.send('');
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
