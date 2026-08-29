import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Transaksi", path: "/transaksi" },
    { name: "Laporan", path: "/laporan" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-extrabold text-indigo-600 tracking-tight">
            💰 FinTrack Pro
          </h1>
        </div>
        <nav className="p-4 space-y-1">
          {menus.map((menu) => {
            const active = location.pathname === menu.path;
            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-sm transition-all"
        >
          <span>🚪 Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
