import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Database SQLite
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error("Gagal koneksi database", err.message);
  else console.log("Terhubung ke database SQLite.");
});

// Buat tabel transaksi jika belum ada
db.run(`CREATE TABLE IF NOT EXISTS transaksi (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  tipe TEXT,
  jumlah REAL,
  kategori TEXT,
  deskripsi TEXT,
  tanggal TEXT
)`);

// Endpoint Ambil Transaksi berdasarkan Username
app.get("/api/transaksi", (req, res) => {
  const { username } = req.query;
  db.all(
    `SELECT * FROM transaksi WHERE username = ? ORDER BY id DESC`,
    [username],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    },
  );
});

// Endpoint Tambah Transaksi
app.post("/api/transaksi", (req, res) => {
  const { username, tipe, jumlah, kategori, deskripsi, tanggal } = req.body;
  db.run(
    `INSERT INTO transaksi (username, tipe, jumlah, kategori, deskripsi, tanggal) VALUES (?, ?, ?, ?, ?, ?)`,
    [username, tipe, jumlah, kategori, deskripsi, tanggal],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.all(
        `SELECT * FROM transaksi WHERE username = ? ORDER BY id DESC`,
        [username],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
        },
      );
    },
  );
});

// Endpoint Hapus Transaksi
app.delete("/api/transaksi/:id", (req, res) => {
  const { username } = req.query;

  db.run(
    `DELETE FROM transaksi WHERE id = ? AND username = ?`,
    [req.params.id, username],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.all(
        `SELECT * FROM transaksi WHERE username = ? ORDER BY id DESC`,
        [username],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
        },
      );
    },
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server backend berjalan di port ${PORT}`));
