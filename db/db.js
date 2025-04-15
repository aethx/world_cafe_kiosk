const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../kiosk.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  \`);
  db.run(\`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total REAL NOT NULL,
      timestamp TEXT NOT NULL
    )
  \`);
  db.run(\`
    CREATE TABLE IF NOT EXISTS order_items (
      order_id INTEGER,
      item_id INTEGER,
      quantity INTEGER,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (item_id) REFERENCES items(id)
    )
  \`);
});

module.exports = db;