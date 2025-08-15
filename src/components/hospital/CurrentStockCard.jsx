import React, { useEffect, useState } from "react";

const CurrentStockCard = ({ stock = 2950, label = "Poches" }) => {
  const [count, setCount] = useState(0);

  // Smooth counter animation
  useEffect(() => {
    let start = 0;
    const end = stock;
    const duration = 1000; // 1 second
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 50; // increments
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [stock]);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-200">
      <h2 className="font-semibold text-gray-800 mb-4">Current Stock</h2>
      <div className="w-36 h-36 rounded-full border-8 border-red-400 flex items-center justify-center transition-all duration-300 hover:border-red-500">
        <span className="text-3xl font-bold text-gray-800">{count}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">{label}</div>
    </div>
  );
};

export default CurrentStockCard;
