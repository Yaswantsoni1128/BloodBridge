import React from "react";
import { Eye, CheckCircle, Trash2 } from "lucide-react";

const AlertTable = ({ alerts, onView, onResolve, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md border border-red-200">
                <thead>
                    <tr className="bg-red-600 text-white ">
                        <th className="py-3 px-4 text-center rounded-tl-xl">S.No</th>
                        <th className="py-3 px-4 text-center">Type</th>
                        <th className="py-3 px-4 text-center">Blood Type</th>
                        <th className="py-3 px-4 text-center">Severity</th>
                        <th className="py-3 px-4 text-center">Message</th>
                        <th className="py-3 px-4 text-center">Date</th>
                        <th className="py-3 px-4 text-center">Resolved</th>
                        <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map((alert, index) => (
                        <tr key={alert._id} className="border-b hover:bg-gray-50 text-center">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4 font-medium capitalize">
                                {alert.type === "lowInventory" ? "Low Inventory" : "Blood Request"}
                            </td>
                            <td className="py-3 px-4">{alert.bloodType}</td>
                            <td className="py-3 px-4 capitalize">{alert.severity}</td>
                            <td className="py-3 px-4">{alert.message}</td>
                            <td className="py-3 px-4">
                                {new Date(alert.createdAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </td>
                            <td className="py-3 px-4">
                                {alert.isResolved ? (
                                    <span className="text-green-600 font-semibold">Resolved</span>
                                ) : (
                                    <span className="text-red-600 font-semibold">Pending</span>
                                )}
                            </td>
                            <td className="py-3 px-4 flex gap-2">
                                <button
                                    onClick={() => onView(alert)}
                                    className="text-red-600 hover:bg-red-100 p-2 rounded cursor-pointer"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => onResolve(alert._id)}
                                    disabled={alert.isResolved}
                                    className={`p-2 rounded cursor-pointer ${alert.isResolved
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-green-600 hover:bg-green-100"
                                        }`}
                                >
                                    <CheckCircle size={18} />
                                </button>

                                <button
                                    onClick={() => onDelete(alert._id)}
                                    className="text-gray-600 hover:bg-gray-200 p-2 rounded cursor-pointer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlertTable;
