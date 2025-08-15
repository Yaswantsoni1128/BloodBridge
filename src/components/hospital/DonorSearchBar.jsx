import React from "react";

const DonorSearchBar = ({ searchName, setSearchName, searchGroup, setSearchGroup, bloodGroups, onAddClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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

      <button
        onClick={onAddClick}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition duration-200"
      >
        + Add Donor
      </button>
    </div>
  );
};

export default DonorSearchBar;
