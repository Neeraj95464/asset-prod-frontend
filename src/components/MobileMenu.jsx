// src/components/MobileMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiBarChart2, FiSettings, FiX } from "react-icons/fi";
import logo from "../assets/th.jpeg"; // Ensure you have a logo

const MobileMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between h-16 bg-primary px-4">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <button className="focus:outline-none" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink
            to="/"
            end
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <FiHome className="mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/assets"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <FiBox className="mr-3" />
            Assets
          </NavLink>
          <NavLink
            to="/reports"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <FiBarChart2 className="mr-3" />
            Reports
          </NavLink>
          <NavLink
            to="/settings"
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <FiSettings className="mr-3" />
            Settings
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
