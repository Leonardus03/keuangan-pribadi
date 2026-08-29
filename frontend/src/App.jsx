import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import TransaksiPage from "./pages/TransaksiPage";
import LaporanPage from "./pages/LaporanPage";
import LoginPage from "./pages/LoginPage";
import ModalTransaksi from "./components/ModalTransaksi";
import {
  fetchTransaksi,
  tambahTransaksiAPI,
  hapusTransaksiAPI,
} from "./utils/api";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data dari backend khusus milik user yang sedang login
  useEffect(() => {
    async function loadData() {
      if (isAuthenticated && currentUsername) {
        const data = await fetchTransaksi(currentUsername);
        setTransaksi(data);
      }
    }
    loadData();
  }, [isAuthenticated, currentUsername]);

  const handleLoginSuccess = (status, username) => {
    setIsAuthenticated(status);
    setCurrentUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUsername("");
    setTransaksi([]);
  };

  const handleTambahTransaksi = async (newData) => {
    const updatedData = await tambahTransaksiAPI(currentUsername, newData);
    setTransaksi(updatedData);
  };

  const handleHapusTransaksi = async (id) => {
    const updatedData = await hapusTransaksiAPI(currentUsername, id);
    setTransaksi(updatedData);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <Router>
      <AppLayout
        onOpenModal={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      >
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage transaksi={transaksi} username={currentUsername} />
            }
          />
          <Route
            path="/transaksi"
            element={
              <TransaksiPage
                transaksi={transaksi}
                onDelete={handleHapusTransaksi}
              />
            }
          />
          <Route
            path="/laporan"
            element={<LaporanPage transaksi={transaksi} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ModalTransaksi
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleTambahTransaksi}
        />
      </AppLayout>
    </Router>
  );
}
