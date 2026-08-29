import React, { useState } from "react";
import { formatRupiah } from "../utils/format";

export default function TransaksiPage({ transaksi, onDelete }) {
  const [search, setSearch] = useState("");

  const filtered = transaksi.filter(
    (t) =>
      t.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      t.kategori.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800">Daftar Transaksi</h3>
        <input
          type="text"
          placeholder="Cari transaksi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full md:w-64 focus:outline-indigo-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase">
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Deskripsi</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Tipe</th>
              <th className="py-3 px-4">Jumlah</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-400">
                  Tidak ada data transaksi.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-slate-600">{t.tanggal}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {t.deskripsi}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{t.kategori}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        t.tipe === "income"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {t.tipe === "income" ? "Pemasukan" : "Pengeluaran"}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 font-bold ${t.tipe === "income" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {formatRupiah(t.jumlah)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onDelete(t.id)}
                      className="text-rose-500 hover:text-rose-700 font-medium text-xs px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
