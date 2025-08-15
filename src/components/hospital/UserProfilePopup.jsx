import React, { useEffect, useState, useRef } from "react";
import { fetchUserProfile } from "../../api/api"; // You'll create this API call

const UserProfilePopup = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUserProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    getUser();
  }, []);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!user) {
    return (
      <div
        ref={popupRef}
        className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl p-4 text-gray-800"
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl px-6 py-8 text-white z-50"
    >
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-white">{user.email}</p>
      <p className="text-sm text-white">{user.phone}</p>
      <p className="text-sm text-white capitalize">Role: {user.role}</p>

      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Update Profile
        </button>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
