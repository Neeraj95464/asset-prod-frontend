// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiSettings,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";
import logo from "../assets/th.jpeg"; // Add your logo in src/assets/

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-primary">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavLink
          to="/"
          end
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
          to="/employees"
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FiUsers className="mr-3" />
          Employee
        </NavLink>
        <NavLink
          to="/vendors"
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <FiShoppingCart className="mr-3" />
          Vender
        </NavLink>
        <NavLink
          to="/reports"
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
    </aside>
  );
};

export default Sidebar;
