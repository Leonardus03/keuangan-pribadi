import React from 'react';

export default function WelcomeBanner({ username }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/10">
      <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      {/* Menampilkan username secara dinamis */}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Selamat Datang, {username || 'User'}! 👋</h2>
      <p className="text-indigo-100 text-sm mt-2 max-w-xl">
        Pantau alur kas harian, atur pengeluaran, dan capai kebebasan finansialmu dengan mudah di FinTrack Pro.
      </p>
    </div>
  );
}