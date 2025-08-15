import React from "react";

const DonorViewModal = ({ isOpen, onClose, donor, onEdit, onDelete }) => {
  if (!isOpen || !donor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[500px] p-6">
        <h3 className="text-2xl font-bold text-red-700 mb-4 border-b pb-2">
          Donor Details
        </h3>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Name:</span> {donor.name}</p>
          <p><span className="font-semibold">Email:</span> {donor.email}</p>
          <p><span className="font-semibold">Phone:</span> {donor.phone}</p>
          <p><span className="font-semibold">Amount:</span> {donor.amount} units</p>
          <p><span className="font-semibold">Blood Type:</span> {donor.bloodType}</p>
          <p><span className="font-semibold">Request ID:</span> {donor.requestId || "N/A"}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(donor.createdAt).toLocaleString()}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onEdit(donor)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(donor._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorViewModal;
