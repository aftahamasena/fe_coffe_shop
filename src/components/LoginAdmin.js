import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.jpg";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://172.16.100.39:8000/admin/auth",
        {
          email,
          password,
        }
      );
      const { status, logged, message, token } = response.data;
      if (status && logged) {
        setToken(token); 
        localStorage.setItem("adminToken", token);
        window.location.href = "/Item";
        setError(message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
        </div>
        <h2 className="text-3xl font-semibold text-center mb-3">Login</h2>
        <h3 className="text-md text-center mb-6">
          Welcome to Cofe Shop, Please login first !
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="text-center mt-8 text-sm">
          Bukan admin ? <a href="/" className="text-blue-500 hover:text-blue-600">Masuk ke mode pengguna</a>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
