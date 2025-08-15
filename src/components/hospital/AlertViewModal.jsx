import React from "react";
import { CheckCircle } from "lucide-react";

const AlertViewModal = ({ isOpen, onClose, alert, onResolve, onDelete }) => {
  if (!isOpen || !alert) return null;

  const readableType =
    alert.type === "lowInventory" ? "Low Inventory" : "Blood Request";

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[500px] p-6">
        <h3 className="text-2xl font-bold text-red-700 mb-4 border-b pb-2">
          Alert Details
        </h3>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Type:</span> {readableType}
          </p>
          <p>
            <span className="font-semibold">Blood Type:</span>{" "}
            {alert.bloodType}
          </p>
          <p>
            <span className="font-semibold">Severity:</span>{" "}
            {alert.severity.toUpperCase()}
          </p>
          <p>
            <span className="font-semibold">Message:</span> {alert.message}
          </p>
          <p>
            <span className="font-semibold">Resolve status:</span>{" "}
            {alert.isResolved ? (
              <span className="text-green-600 font-semibold">
                Resolved!
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Pending...</span>
            )}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(alert.createdAt).toLocaleString()}
          </p>
          {alert.isResolved && alert.resolvedAt && (
            <p>
              <span className="font-semibold">Resolved At:</span>{" "}
              {new Date(alert.resolvedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {!alert.isResolved && (
            <button
              onClick={() => onResolve(alert._id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
            >
              <CheckCircle size={18} /> Resolve
            </button>
          )}
          <button
            onClick={() => onDelete(alert._id)}
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

export default AlertViewModal;
