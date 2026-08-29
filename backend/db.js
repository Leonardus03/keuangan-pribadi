import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database("./keuangan.db", (err) => {
  if (err) {
    console.error("Gagal terhubung ke database SQLite:", err.message);
  } else {
    console.log("Terhubung ke database SQLite.");
  }
});

// Buat tabel transaksi jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS transaksi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  kategori TEXT NOT NULL,
  tipe TEXT NOT NULL,
  jumlah REAL NOT NULL
)`);

export default db;
