import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil database user lokal dari localStorage atau gunakan default Leonardus
    const registeredUsers = JSON.parse(
      localStorage.getItem("fintrack_users"),
    ) || [{ username: "Leonardus", password: "Leon2003" }];

    if (isRegister) {
      // Proses Pendaftaran Akun Baru
      const userExists = registeredUsers.some((u) => u.username === username);
      if (userExists) {
        setIsError(true);
        setMessage("Username sudah terdaftar, silakan gunakan yang lain.");
      } else {
        registeredUsers.push({ username, password });
        localStorage.setItem("fintrack_users", JSON.stringify(registeredUsers));
        setIsError(false);
        setMessage("Pendaftaran berhasil! Silakan masuk.");
        setIsRegister(false);
        setUsername("");
        setPassword("");
      }
    } else {
      // Proses Login
      const foundUser = registeredUsers.find(
        (u) => u.username === username && u.password === password,
      );
      if (foundUser) {
        onLogin(true, username);
      } else {
        setIsError(true);
        setMessage("Username atau password salah!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/50 text-3xl mb-4">
            💰
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            FinTrack Pro
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            {isRegister
              ? "Daftar akun keuangan baru"
              : "Sistem Manajemen Keuangan Pribadi"}
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border text-xs text-center font-medium ${
              isError
                ? "bg-rose-500/20 border-rose-500/30 text-rose-300"
                : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
          >
            {isRegister ? "Daftar Akun" : "Masuk ke Sistem"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
            }}
            className="text-xs text-indigo-300 hover:text-indigo-200 font-medium transition"
          >
            {isRegister
              ? "Sudah punya akun? Masuk di sini"
              : "Belum punya akun? Daftar baru di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}
