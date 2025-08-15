import React, { useState, useEffect } from "react";
import HospitalSideBar from "../../components/hospital/HospitalSideBar";
import { fetchDonors } from "../../api/api"; // API call

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchGroup, setSearchGroup] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const getDonors = async () => {
      try {
        const response = await fetchDonors();
        const donorList = Array.isArray(response.data) ? response.data : [];
        setDonors(donorList);
        setFilteredDonors(donorList);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };
    getDonors();
  }, []);

  // Filtering logic
  useEffect(() => {
    const results = donors.filter((donor) => {
      const nameMatch = donor.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const groupMatch = searchGroup
        ? donor.bloodType.toLowerCase() === searchGroup.toLowerCase()
        : true;
      return nameMatch && groupMatch;
    });
    setFilteredDonors(results);
  }, [searchName, searchGroup, donors]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <HospitalSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <h2 className="font-bold text-2xl text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
          Donors
        </h2>

        {/* Search + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-64"
            />

            <select
              value={searchGroup}
              onChange={(e) => setSearchGroup(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-48"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Add Donor Button */}
          <button
            onClick={() => alert("Open Add Donor Modal")}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition duration-200"
          >
            + Add Donor
          </button>
        </div>

        {/* Donors Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Amount (Units)</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor, idx) => (
                  <tr
                    key={donor._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3 px-4 font-medium">{donor.name}</td>
                    <td className="py-3 px-4">{donor.email}</td>
                    <td className="py-3 px-4">{donor.phone}</td>
                    <td className="py-3 px-4 font-semibold text-red-600">
                      {donor.bloodType}
                    </td>
                    <td className="py-3 px-4">{donor.amount}</td>
                    <td className="py-3 px-4">
                      {new Date(donor.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No donors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Donors;
