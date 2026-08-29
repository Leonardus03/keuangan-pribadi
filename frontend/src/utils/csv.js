export const exportToCSV = (data) => {
  const headers = ["ID", "Tanggal", "Deskripsi", "Kategori", "Tipe", "Jumlah"];
  const rows = data.map((t) => [
    t.id,
    t.tanggal,
    `"${t.deskripsi}"`,
    t.kategori,
    t.tipe,
    t.jumlah,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "laporan_keuangan.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
