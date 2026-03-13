import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");

    } catch (err) {

      const message = err.response?.data?.message;

      if (message === "Password is incorrect") {
        alert("Password is incorrect");
      }

      else if (message === "Email does not exist") {
        alert("This email does not exist");
      }

      else {
        alert(message || "Login failed");
      }

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-slate-50 border border-slate-300 shadow-md rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-slate-700 text-center mb-6">
          Leave Management System
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;