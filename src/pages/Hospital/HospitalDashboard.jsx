import React, { useState } from 'react'

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#f5f6fa] py-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-center mb-8 text-3xl font-bold text-[#e53935]">Hospital Dashboard</h1>
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-lg font-bold transition border ${activeTab === 'overview' ? 'border-[#e53935] bg-[#ffeaea] text-[#e53935]' : 'border-gray-200 bg-white text-gray-700'} shadow-sm`}>Overview</button>
          <button onClick={() => setActiveTab('inventory')} className={`px-6 py-3 rounded-lg font-bold transition border ${activeTab === 'inventory' ? 'border-[#e53935] bg-[#ffeaea] text-[#e53935]' : 'border-gray-200 bg-white text-gray-700'} shadow-sm`}>Inventory</button>
          <button onClick={() => setActiveTab('requests')} className={`px-6 py-3 rounded-lg font-bold transition border ${activeTab === 'requests' ? 'border-[#e53935] bg-[#ffeaea] text-[#e53935]' : 'border-gray-200 bg-white text-gray-700'} shadow-sm`}>Requests</button>
        </div>
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard
