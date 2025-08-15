import React from "react";

const RecentDonors = ({ donors = [], loading, error }) => {
  return (
    <div className="col-span-2 bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold text-lg text-red-700 mb-5 border-b pb-2">
        Recent Donors
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-6">Loading donors...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">{error}</div>
      ) : donors.length === 0 ? (
        <div className="text-center text-gray-500 py-6">No donors yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-gray-500 text-left">
                <th className="pb-3 px-3">Name</th>
                <th className="pb-3 px-3">Address</th>
                <th className="pb-3 px-3">Phone</th>
                <th className="pb-3 px-3">Group</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-red-50`}
                >
                  <td className="py-3 px-3 text-gray-800 font-medium">
                    {donor.name || donor[0]}
                  </td>
                  <td className="py-3 px-3 text-gray-600">
                    {donor.address || donor[1]}
                  </td>
                  <td className="py-3 px-3 text-gray-600">
                    {donor.phone || donor[2]}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-700">
                      {donor.group || donor[3]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentDonors;
