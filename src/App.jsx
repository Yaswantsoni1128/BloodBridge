import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard.jsx";
import Donors from "./pages/Hospital/Donors.jsx";
import Inventory from "./pages/Hospital/Inventory.jsx";
import Alerts from "./pages/Hospital/Alerts.jsx";
import HospitalLayout from "./pages/Hospital/HospitalLayout.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Hospital Section */}
        <Route path="/hospital" element={<HospitalLayout />}>
          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="donors" element={<Donors />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
