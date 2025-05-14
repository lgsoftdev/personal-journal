const db = require('better-sqlite3')('database.db');

const createTable = () => {
  const sql = `
    CREATE TABLE teladds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    mobile TEXT,
    email TEXT,
    website TEXT
)
    `;
  db.prepare(sql).run();
};

// createTable();

const insertIntoTable = (name, address, phone, mobile, email, website) => {
  const sql = `
    INSERT INTO teladds (name, address, phone, mobile, email, website)
VALUES (?, ?, ?, ?, ?, ?);
    `;
  db.prepare(sql).run(name, address, phone, mobile, email, website);
};

// insertIntoTable(
//  'Sydney Opera House',
//  'Bennelong Point Sydney NSW 2000',
//  '1300 764 849',
//  null,
//  null,
//  null
//);

const getTelAdds = () => {
  const sql = `
        SELECT * FROM teladds
    `;
  const rows = db.prepare(sql).all();
  console.log(rows);
};

// getTelAdds();

const getTelAddsByChar = (char) => {
  const sql = `
        SELECT * FROM teladds
        WHERE lower(name) like '${String(char).toLowerCase()}%' 
    `;
  const rows = db.prepare(sql).all();
  console.log(rows);
  return rows;
};

// getTelAddsByChar('S');
