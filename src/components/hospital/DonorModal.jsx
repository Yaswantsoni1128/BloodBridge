import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const DonorModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
  editDonor,
  bloodGroups,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h3 className="text-xl font-bold mb-4 text-red-600">
          {editDonor ? "Edit Donor" : "Add Donor"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            placeholder="Amount (Units)"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <select
            value={formData.bloodType}
            onChange={(e) =>
              setFormData({ ...formData, bloodType: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            placeholder="Request ID"
            value={formData.requestId}
            onChange={(e) =>
              setFormData({ ...formData, requestId: e.target.value })
            }
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          /> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : editDonor ? "Update Donor" : "Add Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorModal;
