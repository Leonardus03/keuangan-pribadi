import React from "react";
import { exportToCSV } from "../utils/csv";
import { formatRupiah } from "../utils/format";

export default function LaporanPage({ transaksi }) {
  const totalPemasukan = transaksi
    .filter((t) => t.tipe === "income")
    .reduce((a, b) => a + b.jumlah, 0);
  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === "expense")
    .reduce((a, b) => a + b.jumlah, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl">
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Laporan Keuangan
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        Unduh data laporan keuangan kamu dalam format CSV untuk diolah lebih
        lanjut.
      </p>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm">
          <span className="text-slate-600">Total Keseluruhan Pemasukan</span>
          <span className="font-bold text-emerald-600">
            {formatRupiah(totalPemasukan)}
          </span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm">
          <span className="text-slate-600">Total Keseluruhan Pengeluaran</span>
          <span className="font-bold text-rose-600">
            {formatRupiah(totalPengeluaran)}
          </span>
        </div>
      </div>

      <button
        onClick={() => exportToCSV(transaksi)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm"
      >
        📥 Ekspor ke CSV
      </button>
    </div>
  );
}
