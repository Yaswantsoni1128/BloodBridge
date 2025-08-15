import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api.js";
import StarAnimation from "../utils/StarAnimation.jsx";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      <StarAnimation />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white shadow-xl border border-[#f3dcdc] rounded-3xl px-8 py-2 w-full max-w-md
                   transition-transform duration-300 hover:scale-[1.01] backdrop-blur-md bg-opacity-95"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-gradient-to-tr from-[#e53935] to-[#ff6b6b] rounded-full w-14 h-14 flex items-center justify-center shadow-md">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 
                   10 10 10 10-4.48 10-10S17.52 2 
                   12 2zm0 3a3 3 0 110 6 3 3 0 
                   010-6zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 
                   4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 
                   1.94-3.5 3.22-6 3.22z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#e53935] mt-3">Register</h2>
          <p className="text-gray-500 mt-1 text-xs">
            Create your account to get started
          </p>
        </div>

        {["name", "email", "password", "phone"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block mb-1 text-gray-700 text-sm font-medium capitalize"
            >
              {field}
            </label>
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : field === "phone"
                  ? "tel"
                  : "text"
              }
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={
                field === "name"
                  ? "John Doe"
                  : field === "email"
                  ? "you@example.com"
                  : field === "password"
                  ? "••••••••"
                  : "9876543210"
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50
                         focus:outline-none focus:border-[#e53935] focus:ring-2 
                         focus:ring-[#e53935]/30 text-sm transition-all duration-200"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-[#e53935] to-[#ff6b6b] 
                     text-white rounded-lg font-semibold text-sm shadow-md 
                     hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#e53935] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Register;
