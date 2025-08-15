// components/hospital/AlertFilterBar.jsx
import React from "react";

const AlertFilterBar = ({
  filterSeverity,
  setFilterSeverity,
  filterResolved,
  setFilterResolved,
  showCreateButton,
  onCreate,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <select
        value={filterSeverity}
        onChange={(e) => setFilterSeverity(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="">All Severities</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="critical">Critical</option>
      </select>

      <select
        value={filterResolved}
        onChange={(e) => setFilterResolved(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="resolved">Resolved</option>
        <option value="pending">Pending</option>
      </select>

      {showCreateButton && (
        <button
          onClick={onCreate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-auto"
        >
          + Create Alert
        </button>
      )}
    </div>
  );
};

export default AlertFilterBar;
