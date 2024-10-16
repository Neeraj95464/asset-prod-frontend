// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileMenu from "./components/MobileMenu";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import NotFound from "./pages/NotFound";
import "./app.css";
import VendorManagement from "./components/VendorManagement";
import EmployeeManagement from "./components/EmployeeManagement";
import AssetAssignmentForm from "./components/AssetAssignmentForm";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar for large screens */}
        <Sidebar />

        {/* Mobile Sidebar */}
        <MobileMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/vendors" element={<VendorManagement />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/assign" element={<AssetAssignmentForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
