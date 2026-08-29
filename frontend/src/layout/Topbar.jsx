import React from "react";

export default function Topbar({ onOpenModal }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="text-sm font-medium text-slate-500">
        Sistem Manajemen Keuangan Pribadi
      </div>
      <button
        onClick={onOpenModal}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
      >
        + Tambah Transaksi
      </button>
    </header>
  );
}
