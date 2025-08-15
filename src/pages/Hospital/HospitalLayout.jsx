// src/layouts/HospitalLayout.jsx
import React from "react";
import HospitalSideBar from "../../components/hospital/HospitalSideBar.jsx";
import { Outlet } from "react-router-dom";

const HospitalLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <HospitalSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
};

export default HospitalLayout;
