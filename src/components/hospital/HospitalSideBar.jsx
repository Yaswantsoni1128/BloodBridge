import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { BsDropletHalf } from "react-icons/bs";
import { MdInventory2, MdOutlineNotificationImportant } from "react-icons/md";
import { logoutUser } from "../../api/api";

const HospitalSideBar = () => {
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      icon: <AiOutlineAppstore size={22} />,
      label: "Dashboard",
      path: "/hospital/dashboard",
    },
    {
      id: 2,
      icon: <MdInventory2 size={22} />,
      label: "Inventory",
      path: "/hospital/inventory",
    },
    {
      id: 3,
      icon: <FiUsers size={22} />,
      label: "Donors",
      path: "/hospital/donors",
    },
    {
      id: 4,
      icon: <MdOutlineNotificationImportant size={22} />,
      label: "Alerts",
      path: "/hospital/alerts",
    },
  ];

  const logoutHandler = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-20 bg-neutral-900 flex flex-col items-center pb-6 text-white rounded-r-2xl">
      {/* Top Logo */}
      <div className="w-full flex items-center justify-center h-20 bg-red-600 rounded-tr-xl rounded-br-xl">
        <BsDropletHalf size={28} />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-center space-y-4 mt-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.id}
              className={`relative group flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer transition-all duration-200
                ${isActive ? "bg-red-600 shadow-lg" : "bg-neutral-800 hover:bg-neutral-700"}`}
            >
              {item.icon}
              {/* Tooltip */}
              <span className="absolute left-14 whitespace-nowrap bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                {item.label}
                <span className="text-lg">›</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mt-auto flex flex-col items-center">
        <button
          onClick={logoutHandler}
          className="relative group flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-800 hover:bg-neutral-700"
        >
          <FiLogOut size={22} />
          <span className="absolute left-14 whitespace-nowrap bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default HospitalSideBar;
