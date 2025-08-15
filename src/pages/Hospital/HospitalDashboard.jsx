// src/pages/hospital/HospitalDashboard.jsx
import React, { useEffect, useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import BloodStats from "../../components/Hospital/BloodStats";
import RecentDonors from "../../components/Hospital/RecentDonors";
import CurrentStockCard from "../../components/Hospital/CurrentStockCard";
import UserProfilePopup from "../../components/Hospital/UserProfilePopup";
import { fetchRecentDonors } from "../../api/api";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const [recentDonors, setRecentDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [errorDonors, setErrorDonors] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

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

  const goToAlert = () => {
    // Navigate to the alerts page
    navigate("/hospital/alerts");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">
          Hospital Dashboard
        </h1>
        <div className="flex items-center space-x-4 text-gray-600 relative">
          <FiBell className="text-xl md:text-2xl cursor-pointer hover:text-red-500 transition" 
          onClick={goToAlert}/>
          <div className="relative">
            <FiUser
              className="text-xl md:text-2xl cursor-pointer hover:text-red-500 transition"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <UserProfilePopup onClose={() => setShowProfile(false)} />
            )}
          </div>
        </div>
      </div>

      {/* Blood Type Stats */}
      {/* <BloodStats /> */}

      {/* Donors & Stock */}
      <div className="w-full px-2">
        <div className="lg:col-span-2">
          <RecentDonors
            donors={recentDonors}
            loading={loadingDonors}
            error={errorDonors}
          />
        </div>
        {/* <CurrentStockCard /> */}
      </div>
    </div>
  );
};

export default HospitalDashboard;
