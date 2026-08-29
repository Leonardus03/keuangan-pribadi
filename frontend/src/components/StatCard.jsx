import React from "react";
import { formatRupiah } from "../utils/format";

export default function StatCard({ title, amount, type }) {
  const colors = {
    income: "text-emerald-600 bg-emerald-50",
    expense: "text-rose-600 bg-rose-50",
    balance: "text-indigo-600 bg-indigo-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p
        className={`text-2xl font-bold mt-2 ${colors[type] || "text-slate-800"}`}
      >
        {formatRupiah(amount)}
      </p>
    </div>
  );
}
