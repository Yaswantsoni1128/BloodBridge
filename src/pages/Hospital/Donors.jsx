// Donors.jsx
import React, { useState, useEffect } from "react";
import {
  fetchDonors,
  addDonor,
  updateDonor,
  deleteDonor,
} from "../../api/api";
import DonorSearchBar from "../../components/Hospital/DonorSearchBar.js";
import DonorTable from "../../components/Hospital/DonorTable.js";
import DonorModal from "../../components/Hospital/DonorModal.js";
import DonorViewModal from "../../components/Hospital/DonorViewModal.js";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchGroup, setSearchGroup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editDonor, setEditDonor] = useState(null);
  const [viewDonor, setViewDonor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    bloodType: "",
    requestId: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const getDonors = async () => {
      setLoading(true);
      try {
        const res = await fetchDonors();
        setDonors(res.data || []);
        setFilteredDonors(res.data || []);
      } catch {
        setError("Failed to load donors.");
      } finally {
        setLoading(false);
      }
    };
    getDonors();
  }, []);

  useEffect(() => {
    setFilteredDonors(
      donors.filter(
        (d) =>
          (d?.name || "")
            .toLowerCase()
            .includes((searchName || "").toLowerCase()) &&
          (searchGroup ? d?.bloodType === searchGroup : true)
      )
    );
  }, [searchName, searchGroup, donors]);

  const openModal = (donor = null) => {
    setEditDonor(donor);
    setFormData(
      donor || {
        name: "",
        email: "",
        phone: "",
        amount: "",
        bloodType: "",
        requestId: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleView = (donor) => {
    setViewDonor(donor);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    try {
      await deleteDonor(id);
      setDonors((prev) => prev.filter((d) => d._id !== id));
      setIsViewModalOpen(false);
    } catch {
      setError("Failed to delete donor.");
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setFormLoading(true);
  try {
    if (editDonor) {
      const res = await updateDonor(editDonor._id, formData);
      if (res.status === 200) {
        setDonors((prev) =>
          prev.map((d) =>
            d._id === editDonor._id ? { ...d, ...formData } : d
          )
        );
      }
    } else {
      await addDonor(formData);
      // Reload all donors after adding a new one
      const res = await fetchDonors();
      setDonors(res.data || []);
    }
    setIsModalOpen(false);
  } catch {
    setError("Failed to save donor.");
  } finally {
    setFormLoading(false);
  }
};


  return (
    <>
      <h2 className="font-bold text-2xl text-red-700 mb-6 border-b-2 border-red-500 pb-2">
        Donors
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading donors...</p>
      ) : (
        <>
          <DonorSearchBar
            searchName={searchName}
            setSearchName={setSearchName}
            searchGroup={searchGroup}
            setSearchGroup={setSearchGroup}
            bloodGroups={bloodGroups}
            onAddClick={() => openModal()}
          />
          <DonorTable
            donors={filteredDonors}
            onEdit={openModal}
            onView={handleView}
          />
        </>
      )}

      {/* Add / Edit Modal */}
      <DonorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={formLoading}
        editDonor={editDonor}
        bloodGroups={bloodGroups}
      />

      {/* View Modal */}
      <DonorViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        donor={viewDonor}
        onEdit={(d) => {
          setIsViewModalOpen(false);
          openModal(d);
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Donors;
