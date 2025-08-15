import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const InventoryModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
  editInventory,
  bloodGroups,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-bold mb-4 text-red-600">
          {editInventory ? "Edit Inventory" : "Add Inventory"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Units Available"
            value={formData.unitsAvailable}
            onChange={(e) =>
              setFormData({ ...formData, unitsAvailable: Number(e.target.value) })
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editInventory
              ? "Update Inventory"
              : "Add Inventory"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;
