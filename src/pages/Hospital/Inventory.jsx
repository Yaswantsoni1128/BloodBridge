import React, { useEffect, useState } from "react";
import {
  fetchHospitalInventory,
  updateInventoryUnits,
  createInventory,
} from "../../api/api.js";
import InventoryModal from "../../components/hospital/InventoryModal.jsx";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [usedUnits, setUsedUnits] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    bloodType: "",
    unitsAvailable: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" }); // success/error message

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    try {
      setLoading(true);
      const { data } = await fetchHospitalInventory();
      setInventory(data.inventory || []);
    } catch (error) {
      setMessage({ text: "Error fetching inventory", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateSubmit = async () => {
    if (!usedUnits || isNaN(usedUnits)) return;
    const used = parseInt(usedUnits, 10);
    if (used <= 0 || used > selectedInventory.currentUnits) return;

    const newUnits = selectedInventory.currentUnits - used;

    try {
      console.log("selectedInventory:", selectedInventory);
      await updateInventoryUnits(
        selectedInventory.id,
        selectedInventory.bloodType,
        newUnits
      );
      
      setShowUpdateModal(false);
      setUsedUnits("");
      setMessage({
        text: `Inventory updated! Remaining units: ${newUnits}`,
        type: "success",
      });
      getInventory();
    } catch (error) {
      setMessage({ text: "Failed to update inventory", type: "error" });
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bloodType || !formData.unitsAvailable) return;

    try {
      await createInventory(formData);
      setShowAddModal(false);
      setFormData({ bloodType: "", unitsAvailable: "" });
      setMessage({ text: "Inventory added successfully!", type: "success" });
      getInventory();
    } catch (error) {
      setMessage({ text: "Failed to add inventory", type: "error" });
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="font-bold text-2xl text-red-700 mb-5 border-b pb-2">
        Inventory
      </h2>


      {/* Search + Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by blood group"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition w-full sm:w-auto"
          onClick={() => setShowAddModal(true)}
        >
          Add Inventory
        </button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-red-200">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="py-3 px-4 text-center rounded-tl-xl">
                Blood Group
              </th>
              <th className="py-3 px-4 text-center">Current Units</th>
              <th className="py-3 px-4 text-center">Last Updated</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-center"
                >
                  <td className="py-3 px-4 font-bold text-red-700">
                    {item.bloodType}
                  </td>
                  <td className="py-3 px-4">{item.unitsAvailable}</td>
                  <td className="py-3 px-4">
                    {item.inventoryDetails && item.inventoryDetails.length > 0
                      ? new Date(
                          item.inventoryDetails[0].lastUpdated
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        console.log("Selected Inventory in btn:", item);
                        setSelectedInventory({
                          id: item?._id,
                          bloodType: item.bloodType,
                          currentUnits: item.unitsAvailable,
                        });
                        setShowUpdateModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-gray-600 text-center">
                  No inventory found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Inventory Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 p-2">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-red-300 transform scale-95 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-red-600">
              Enter used Units of{" "}
              <span className="font-bold">{selectedInventory?.bloodType}</span>
            </h3>

            <p className="text-black mb-4">
              Current Units:{" "}
              <span className="font-semibold">
                {selectedInventory?.currentUnits}
              </span>
            </p>

            <input
              type="number"
              placeholder="Enter used units"
              value={usedUnits}
              onChange={(e) => setUsedUnits(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Inventory Modal */}
      {showAddModal && (
        <InventoryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddSubmit}
          loading={loading}
          editInventory={false}
          bloodGroups={bloodGroups}
        />
      )}
    </div>
  );
};

export default Inventory;
