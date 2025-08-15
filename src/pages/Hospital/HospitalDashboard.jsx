import React, { useEffect, useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import HospitalSideBar from "../../components/hospital/HospitalSideBar";
import BloodStats from "../../components/hospital/BloodStats";
import RecentDonors from "../../components/hospital/RecentDonors";
import CurrentStockCard from "../../components/hospital/CurrentStockCard";
import UserProfilePopup from "../../components/hospital/UserProfilePopup";
import { fetchRecentDonors } from "../../api/api";

const HospitalDashboard = () => {
  const [recentDonors, setRecentDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [errorDonors, setErrorDonors] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const getDonors = async () => {
      setLoadingDonors(true);
      setErrorDonors(null);
      try {
        const response = await fetchRecentDonors();
        const donorsArray = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.donors)
          ? response.data.donors
          : [];
        setRecentDonors(donorsArray);
      } catch (error) {
        console.error("Error fetching recent donors:", error);
        setErrorDonors("Failed to load recent donors.");
      } finally {
        setLoadingDonors(false);
      }
    };
    getDonors();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <HospitalSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <h1 className="text-3xl font-bold text-gray-800">Hospital Dashboard</h1>
          <div className="flex items-center space-x-4 text-gray-600 relative">
            <FiBell className="text-2xl cursor-pointer hover:text-red-500" />
            <div className="relative">
              <FiUser
                className="text-2xl cursor-pointer hover:text-red-500"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && <UserProfilePopup onClose={() => setShowProfile(false)} />}
            </div>
          </div>
        </div>

        {/* Top Blood Type Stats */}
        <BloodStats />

        {/* Donors & Stock */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <RecentDonors
            donors={recentDonors}
            loading={loadingDonors}
            error={errorDonors}
          />
          <CurrentStockCard />
        </div>
      </main>
    </div>
  );
};

export default HospitalDashboard;
