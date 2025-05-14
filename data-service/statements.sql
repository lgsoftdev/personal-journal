CREATE TABLE teladds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    mobile TEXT,
    email TEXT,
    website TEXT
)

INSERT INTO teladds (name, address, phone)
VALUES ('Sydney Opera House', 'Bennelong Point Sydney NSW 2000', '1300 764 849');

DROP TABLE teladds;