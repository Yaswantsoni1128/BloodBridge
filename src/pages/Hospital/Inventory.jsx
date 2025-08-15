import React, { useEffect, useState } from "react";
import { fetchHospitalInventory, updateInventoryUnits } from "../../api/api.js";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [usedUnits, setUsedUnits] = useState("");



  // Fetch hospital inventory on load
  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    try {
      setLoading(true);
      const { data } = await fetchHospitalInventory();
      setInventory(data.inventory || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update units after usage
  const handleModalSubmit = async () => {
    if (!usedUnits || isNaN(usedUnits)) {
      alert("Please enter a valid number");
      return;
    }

    const used = parseInt(usedUnits, 10);
    if (used <= 0) return alert("Used units must be greater than 0");
    if (used > selectedInventory.currentUnits) return alert("Used units cannot exceed available units");

    const newUnits = selectedInventory.currentUnits - used;

    try {
      await updateInventoryUnits(selectedInventory.id, selectedInventory.bloodType, newUnits);
      alert(`Inventory updated successfully! Remaining units: ${newUnits}`);
      setShowModal(false);
      setUsedUnits("");
      getInventory();
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Failed to update inventory");
    }
  };



  if (loading) {
    return <p className="text-center text-gray-600">Loading inventory...</p>;
  }
  console.log("ALL INVENTORIES: ", inventory);

  return (
    <>
      <div className="p-5">
  <h2 className="font-semibold text-lg text-red-700 mb-5 border-b pb-2">Inventory</h2>

  {inventory.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md border border-red-200">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="py-3 px-4 text-center rounded-tl-xl">Blood Group</th>
            <th className="py-3 px-4 text-center">Current Units</th>
            <th className="py-3 px-4 text-center">Last Updated</th>
            <th className="py-3 px-4 text-center rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 text-center">
              <td className="py-3 px-4 font-bold text-red-700">{item.bloodType}</td>
              <td className="py-3 px-4">{item.unitsAvailable}</td>
              <td className="py-3 px-4">
                {new Date(item.inventoryDetails[0].lastUpdated).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => {
                    setSelectedInventory({
                      id: item.inventoryDetails[0]._id,
                      bloodType: item.bloodType,
                      currentUnits: item.unitsAvailable,
                    });
                    setShowModal(true);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-600">No inventory found for this hospital.</p>
  )}
</div>


      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white/80 p-6 rounded-2xl w-96 pointer-events-auto shadow-xl border border-red-300 transform scale-95 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-red-600">
              Enter used Units of <span className="font-bold">{selectedInventory?.bloodType}</span>
            </h3>

            <p className="text-black mb-4">
              Current Units for <span className="font-semibold">{selectedInventory?.bloodType}</span>: {selectedInventory?.currentUnits}
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
                onClick={() => {
                  setShowModal(false);
                  setUsedUnits("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
                onClick={handleModalSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>

      )}


    </>
  );
};

export default Inventory;
