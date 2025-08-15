import React from "react";

const bloodData = [
  { type: "A+", count: 1734 },
  { type: "A-", count: 3220 },
  { type: "B+", count: 2023 },
  { type: "B-", count: 4502 },
  { type: "AB+", count: 4502 },
  { type: "AB-", count: 4502 },
  { type: "O+", count: 4502 },
  { type: "O-", count: 4502 },
];

const BloodStats = () => {
  return (
    <div className="bg-white rounded-xl shadow-md w-full grid grid-cols-8 gap-y-4 gap-x-2 p-4">
      {bloodData.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-center gap-3"
        >
          {/* Blood Drop Icon */}
          <div className="relative w-14 h-20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="w-full h-full"
            >
              <path d="M12 2C8 8 4 12 4 16a8 8 0 1 0 16 0c0-4-4-8-8-14z" />
            </svg>
            <span className="absolute text-white font-bold text-base">
              {item.type}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {/* Count */}
            <h2 className="text-lg font-semibold">{item.count}</h2>
            {/* Label */}
            <p className="text-gray-500 text-xs">Units</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodStats;
