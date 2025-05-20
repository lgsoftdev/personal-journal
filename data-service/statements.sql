CREATE TABLE teladds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    mobile TEXT,
    email TEXT,
    website TEXT
)

INSERT INTO teladds (name, address, lat, lng, phone)
VALUES ('Sydney Opera House', 'Bennelong Point Sydney NSW 2000',151.21519004029523, -33.85680043257648, '1300 764 849');

DROP TABLE teladds;