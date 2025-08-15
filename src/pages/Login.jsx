import React, { useState, useEffect, useRef } from "react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Star animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Star object
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.speed = Math.random() * 0.5 + 0.2;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = 0;
        }
        this.draw();
      }
    }

    // Particle from explosion
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = "white";
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }
    }

    // Create base stars
    for (let i = 0; i < 150; i++) {
      stars.push(new Star());
    }

    // Create explosion
    const createExplosion = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2);
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y));
      }
    };

    // Trigger explosion every few seconds
    setInterval(createExplosion, 3000);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => star.update());

      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* Animated Starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ display: "block" }}
      ></canvas>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white shadow-xl border border-[#f3dcdc] rounded-3xl px-10 py-4 w-full max-w-md 
                   transition-transform duration-300 hover:scale-[1.01] backdrop-blur-md bg-opacity-95"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-tr from-[#e53935] to-[#ff6b6b] rounded-full w-16 h-16 flex items-center justify-center shadow-md">
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
          </div>
          <h2 className="text-3xl font-bold text-[#e53935] mt-4">Login</h2>
          <p className="text-gray-500 mt-1 text-sm">Welcome back! Please enter your details</p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50
                       focus:outline-none focus:border-[#e53935] focus:ring-2 
                       focus:ring-[#e53935]/30 transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
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
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50
                       focus:outline-none focus:border-[#e53935] focus:ring-2 
                       focus:ring-[#e53935]/30 transition-all duration-200"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#e53935] to-[#ff6b6b] 
                     text-white rounded-lg font-semibold text-lg shadow-md 
                     hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          Login
        </button>

        {submitted && (
          <div className="mt-6 text-[#e53935] text-center font-medium animate-fadeIn">
            ✅ Login submitted!
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
