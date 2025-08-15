// DonorTable.jsx
import React from "react";
import DonorActions from "./DonorActions";

const DonorTable = ({ donors, onEdit, onView }) => {
  return (
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
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.length > 0 ? (
            donors.map((donor, idx) => (
              <tr
                key={donor._id || `temp-${idx}`}
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
                <td className="py-3 px-4">
                  <DonorActions
                    onView={() => onView(donor)}
                    onEdit={() => onEdit(donor)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-gray-500 italic"
              >
                No donors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorTable;
