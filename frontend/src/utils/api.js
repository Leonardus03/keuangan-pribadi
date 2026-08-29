// Ganti URL ini nanti dengan URL backend yang di-deploy di Render/Railway
const API_URL = "http://localhost:5000/api";

export const fetchTransaksi = async (username) => {
  try {
    const response = await fetch(`${API_URL}/transaksi?username=${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
};

export const tambahTransaksiAPI = async (username, transaksiBaru) => {
  try {
    const response = await fetch(`${API_URL}/transaksi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, ...transaksiBaru }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal menambah transaksi:", error);
    return [];
  }
};

export const hapusTransaksiAPI = async (username, id) => {
  try {
    const response = await fetch(
      `${API_URL}/transaksi/${id}?username=${username}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal menghapus transaksi:", error);
    return [];
  }
};
