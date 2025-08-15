import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import HospitalSideBar from "../../components/hospital/HospitalSideBar";
import BloodStats from "../../components/hospital/BloodStats";

const HospitalDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <HospitalSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <FiBell className="text-2xl cursor-pointer hover:text-red-500" />
            <FiUser className="text-2xl cursor-pointer hover:text-red-500" />
          </div>
        </div>

        {/* Top Blood Type Stats */}
       <BloodStats />

        {/* Donors & Stock */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* Donors Table */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">Recent Donors</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Address</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Group</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Savannah Nguyen", "Yoff village", "(704) 555-0127", "A-"],
                  ["Nanata Fall", "Pikine, rue 10", "(704) 555-0100", "A+"],
                  ["Alain Diop", "Keur Ndiaye Lo", "(907) 555-0101", "O-"],
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {row.map((cell, i) => (
                      <td key={i} className="py-3 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock Circle */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <h2 className="font-semibold text-gray-800 mb-4">Current Stock</h2>
            <div className="w-36 h-36 rounded-full border-8 border-red-400 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">2950</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">Poches</div>
          </div>
        </div>

        {/* Bottom Summary Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { label: "Total Poches", value: 7208, bg: "bg-blue-100" },
            { label: "Total Donors", value: 1204, bg: "bg-orange-100" },
            { label: "Youth (18-25)", value: 765, bg: "bg-purple-100" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bg} rounded-xl p-6 hover:shadow-md transition`}
            >
              <div className="text-gray-500 text-sm">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;
