import React, { useState, useEffect } from "react";
import {
  fetchAlerts,
  resolveAlert,
  deleteAlert,
  createAlert 
} from "../../api/api.js";
import AlertTable from "../../components/hospital/AlertTable.jsx";
import AlertViewModal from "../../components/hospital/AlertViewModal.jsx";
import AlertFilterBar from "../../components/hospital/AlertFilterBar.jsx";
import CreateAlertModal from "../../components/hospital/CreateAlertModal.jsx";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterResolved, setFilterResolved] = useState("");
  const [showCreateButton, setShowCreateButton] = useState(true);

  const [viewAlert, setViewAlert] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const getAlerts = async () => {
      setLoading(true);
      try {
        const res = await fetchAlerts();
        setAlerts(res.data.alerts || []);
      } catch {
        setError("Failed to load alerts.");
      } finally {
        setLoading(false);
      }
    };
    getAlerts();
  }, []);

  // Filtering
  useEffect(() => {
    let tmp = alerts;
    if (filterSeverity) tmp = tmp.filter(a => a.severity === filterSeverity);
    if (filterResolved === "resolved") tmp = tmp.filter(a => a.isResolved);
    if (filterResolved === "pending") tmp = tmp.filter(a => !a.isResolved);
    setFilteredAlerts(tmp);
  }, [alerts, filterSeverity, filterResolved]);

  const handleView = (alertData) => {
    setViewAlert(alertData);
    setIsViewModalOpen(true);
  };

  const handleResolve = async (id) => {
    await resolveAlert(id);
    setAlerts(prev => prev.map(a => a._id === id ? { ...a, isResolved: true } : a));
    setIsViewModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteAlert(id);
    setAlerts(prev => prev.filter(a => a._id !== id));
    setIsViewModalOpen(false);
  };

  const handleCreateAlertSubmit = async (newAlert) => {
  try {
    await createAlert(newAlert);
    // Optionally refresh alerts again
    const res = await fetchAlerts();
    setAlerts(res.data.alerts || []);
    setIsCreateModalOpen(false);
  } catch (err) {
    console.error("Failed to create alert", err);
    setError("Failed to create alert.");
  }
};


  return (
    <>
      <h2 className="font-bold text-2xl text-red-700 mb-6 border-b-2 border-red-500 pb-2">
        Alerts
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading alerts...</p>
      ) : (
        <>
          <AlertFilterBar
            filterSeverity={filterSeverity}
            setFilterSeverity={setFilterSeverity}
            filterResolved={filterResolved}
            setFilterResolved={setFilterResolved}
            showCreateButton={showCreateButton}
            onCreate={() => setIsCreateModalOpen(true)}
          />

          <AlertTable
            alerts={filteredAlerts}
            onView={handleView}
            onResolve={handleResolve}
            onDelete={handleDelete}
          />
        </>
      )}

      <AlertViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        alert={viewAlert}
        onResolve={handleResolve}
        onDelete={handleDelete}
      />

      <CreateAlertModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAlertSubmit}
      />
    </>
  );
};

export default Alerts;
