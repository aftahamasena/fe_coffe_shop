import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const isLoggedIn = !!localStorage.getItem("adminToken"); // Cek apakah admin sudah login
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login"); // Redirect ke halaman login menggunakan useNavigate
  };

  if (!isLoggedIn) {
    return null; // Jika belum login, tampilkan null (tidak menampilkan navigasi)
  }

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center border-r-2 pr-4 text-white font-semibold">
              Admin Mode
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <Link
                to="/item"
                className="text-white rounded-md text-sm hover:text-blue-500"
              >
                Menu Item
              </Link>
              <Link
                to="/history"
                className="text-white px-3 rounded-md text-sm hover:text-blue-500"
              >
                History Transaksi
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
