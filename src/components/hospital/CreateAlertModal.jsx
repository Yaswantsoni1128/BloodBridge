// components/hospital/CreateAlertModal.jsx
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateAlertModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [newAlert, setNewAlert] = useState({
    type: "lowInventory",
    bloodType: "",
    message: "",
    severity: "warning",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({ ...newAlert, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newAlert);
    // reset local state after submit
    setNewAlert({
      type: "lowInventory",
      bloodType: "",
      message: "",
      severity: "warning",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-semibold text-red-600 mb-4 border-b pb-2">Create Alert</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="type"
            value={newAlert.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="lowInventory">Low Inventory</option>
            <option value="bloodRequest">Blood Request</option>
          </select>

          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type (e.g. A+, O-)"
            value={newAlert.bloodType}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={newAlert.message}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <select
            name="severity"
            value={newAlert.severity}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Alert"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlertModal;
