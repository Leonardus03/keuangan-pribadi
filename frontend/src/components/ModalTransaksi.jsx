import React, { useState } from "react";

export default function ModalTransaksi({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    deskripsi: "",
    kategori: "Makanan",
    tipe: "expense",
    jumlah: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      jumlah: parseFloat(formData.jumlah),
    });
    setFormData({
      tanggal: new Date().toISOString().split("T")[0],
      deskripsi: "",
      kategori: "Makanan",
      tipe: "expense",
      jumlah: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Tambah Transaksi Baru
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Tanggal
            </label>
            <input
              type="date"
              required
              value={formData.tanggal}
              onChange={(e) =>
                setFormData({ ...formData, tanggal: e.target.value })
              }
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Deskripsi
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Belanja Bulanan"
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Tipe
              </label>
              <select
                value={formData.tipe}
                onChange={(e) =>
                  setFormData({ ...formData, tipe: e.target.value })
                }
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
              >
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Kategori
              </label>
              <input
                type="text"
                required
                placeholder="Makanan, Gaji, dll"
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({ ...formData, kategori: e.target.value })
                }
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Jumlah (Rp)
            </label>
            <input
              type="number"
              required
              placeholder="50000"
              value={formData.jumlah}
              onChange={(e) =>
                setFormData({ ...formData, jumlah: e.target.value })
              }
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-indigo-600"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
