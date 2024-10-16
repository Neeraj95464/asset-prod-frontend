// src/components/Header.jsx
import React from "react";
import { FiMenu, FiBell, FiUser } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-primary text-white flex items-center justify-between px-4 py-3 shadow-md">
      <div className="flex items-center">
        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden mr-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-semibold">IT Asset Management</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none">
          <FiBell size={20} />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            3
          </span>
        </button>
        <button className="focus:outline-none">
          <FiUser size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
