import React from "react";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`${stat.bg} rounded-xl p-6 transition transform hover:scale-105 hover:shadow-lg cursor-pointer`}
          style={{
            background: `linear-gradient(135deg, ${stat.bgColor1}, ${stat.bgColor2})`
          }}
        >
          <div className="text-gray-600 text-sm">{stat.label}</div>
          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
