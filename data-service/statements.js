const db = require('better-sqlite3')('database.db');

function createTelAddsTable() {
  const sql = `
    CREATE TABLE teladds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    lat REAL,
    lng REAL,
    phone TEXT,
    mobile TEXT,
    email TEXT,
    website TEXT
)
    `;
  db.prepare(sql).run();
}

function insertIntoTelAddsTable(
  name,
  address,
  lat,
  lng,
  phone,
  mobile,
  email,
  website
) {
  const sql = `
    INSERT INTO teladds (name, address, lat, lng, phone, mobile, email, website)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
  db.prepare(sql).run(name, address, lat, lng, phone, mobile, email, website);
}

function deleteFromTelAddsById(id) {
  const sql = `
    DELETE FROM teladds WHERE id = ?
    `;
  db.prepare(sql).run(id);
}

function getTelAdds() {
  const sql = `
        SELECT * FROM teladds
    `;
  const rows = db.prepare(sql).all();
  return rows;
}

function getTelAddsByChar(char) {
  const sql = `
        SELECT * FROM teladds
        WHERE lower(name) like '${String(char).toLowerCase()}%' 
    `;
  const rows = db.prepare(sql).all();
  return rows;
}

module.exports = { insertIntoTelAddsTable, getTelAdds, getTelAddsByChar };
