import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API call here if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffeaea] via-[#fff] to-[#fbe6e6] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md px-8 py-10 rounded-2xl shadow-lg w-full max-w-md border border-[#e53935]/20
                   transform transition-all duration-500 hover:shadow-2xl animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <span className="bg-gradient-to-tr from-[#e53935] to-[#ff6b6b] rounded-full w-14 h-14 flex items-center justify-center mr-3 shadow-lg">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
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
          </span>
          <h2 className="font-extrabold text-3xl text-[#e53935]">Login</h2>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:outline-none focus:border-[#e53935] focus:ring-2 
                       focus:ring-[#e53935]/40 text-base transition-all duration-300"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:outline-none focus:border-[#e53935] focus:ring-2 
                       focus:ring-[#e53935]/40 text-base transition-all duration-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#e53935] to-[#ff6b6b] 
                     text-white rounded-lg font-bold text-lg shadow-md 
                     transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
        >
          Login
        </button>

        {/* Success Message */}
        {submitted && (
          <div className="mt-6 text-[#e53935] text-center font-semibold animate-fadeIn">
            ✅ Login submitted!
          </div>
        )}
      </form>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
