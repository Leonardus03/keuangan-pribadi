import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import { formatRupiah } from "../utils/format";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function DashboardPage({ transaksi, username }) {
  const totalPemasukan = transaksi
    .filter((t) => t.tipe === "income")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === "expense")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const saldoTotal = totalPemasukan - totalPengeluaran;
  const transaksiTerbaru = transaksi.slice(0, 5);

  const rasioPengeluaran =
    totalPemasukan > 0
      ? Math.round((totalPengeluaran / totalPemasukan) * 100)
      : 0;

  const chartData = {
    labels: ["Pemasukan", "Pengeluaran"],
    datasets: [
      {
        label: "Total Rupiah",
        data: [totalPemasukan, totalPengeluaran],
        backgroundColor: ["rgba(16, 185, 129, 0.9)", "rgba(244, 63, 94, 0.9)"],
        borderColor: ["#059669", "#e11d48"],
        borderWidth: 0,
        borderRadius: 16,
        barThickness: 48,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleFont: { size: 14, weight: "700", family: "Plus Jakarta Sans" },
        bodyFont: { size: 13, family: "Plus Jakarta Sans" },
        padding: 16,
        cornerRadius: 12,
        boxPadding: 8,
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(241, 245, 249, 1)", drawBorder: false },
        ticks: {
          font: { size: 11, family: "Plus Jakarta Sans" },
          color: "#94a3b8",
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 13, weight: "700", family: "Plus Jakarta Sans" },
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="space-y-8 pb-8">
      <WelcomeBanner username={username} />

      {/* Statistik Utama dengan Desain HD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-7 text-white shadow-xl shadow-indigo-500/20">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <p className="text-xs font-semibold tracking-wider uppercase text-indigo-200">
            Total Saldo Bersih
          </p>
          <p className="text-3xl font-extrabold tracking-tight mt-3">
            {formatRupiah(saldoTotal)}
          </p>
          <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur-md">
            <span>⚡ Likuiditas Aman</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-xl shadow-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Total Pemasukan
              </p>
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ↓
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight mt-3">
              {formatRupiah(totalPemasukan)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Akumulasi seluruh pemasukan tercatat
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-7 shadow-xl shadow-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Total Pengeluaran
              </p>
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                ↑
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight mt-3">
              {formatRupiah(totalPengeluaran)}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Rasio terhadap pemasukan</span>
            <span
              className={`font-bold ${rasioPengeluaran > 80 ? "text-rose-600" : "text-indigo-600"}`}
            >
              {rasioPengeluaran}%
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Grafik & Transaksi Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grafik Statistik */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-7 shadow-xl shadow-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                Perbandingan Keuangan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Analisis visual arus kas masuk dan keluar
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
              Real-time
            </div>
          </div>
          <div className="w-full flex justify-center items-center py-2">
            <div className="w-full max-w-md">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Daftar Transaksi Terbaru */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 p-7 shadow-xl shadow-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                  Aktivitas Terakhir
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  5 transaksi terakhir yang dimasukkan
                </p>
              </div>
            </div>

            {transaksiTerbaru.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3 text-xl">
                  📂
                </div>
                <p className="text-sm text-slate-400 font-medium">
                  Belum ada transaksi tercatat.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {transaksiTerbaru.map((t) => (
                  <div
                    key={t.id}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/60 hover:bg-slate-50 border border-slate-100/80 transition-all"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${
                          t.tipe === "income"
                            ? "bg-emerald-500 text-white shadow-emerald-500/20"
                            : "bg-rose-500 text-white shadow-rose-500/20"
                        }`}
                      >
                        {t.tipe === "income" ? "↓" : "↑"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {t.deskripsi}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {t.tanggal} •{" "}
                          <span className="font-semibold text-slate-500">
                            {t.kategori}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-extrabold tracking-tight ${t.tipe === "income" ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {t.tipe === "income" ? "+" : "-"}
                      {formatRupiah(t.jumlah)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
