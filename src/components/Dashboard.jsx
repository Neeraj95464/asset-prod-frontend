import React, { useEffect, useState } from "react";
import { getAllAssets } from "../services/api";
import AssetTable from "./AssetTable";
import { FiPlus } from "react-icons/fi";
import Modal from "./Modal";
import AssignmentTable from "./AssignmentTable";
import { fetchAssignments } from "../services/api";

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAllAssets();
      setAssets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setAssets([]); // Fallback to an empty array if there's an error
    }
  };

  // Calculate metrics
  const totalAssets = assets.length;
  const availableAssets = assets.filter(
    (asset) => asset.status === "Available"
  ).length;
  const assignedAssets = assets.filter(
    (asset) => asset.status === "Assigned"
  ).length;

  const loadAssignments = async () => {
    try {
      const data = await fetchAssignments(); // Fetch assignments from your API
      setAssignments(data); // Set the assignments state
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // Fetch assignments when the component mounts
  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="mr-2" /> Add Asset
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Total Assets</h3>
          <p className="text-3xl font-bold text-primary">{totalAssets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Available</h3>
          <p className="text-3xl font-bold text-green-500">{availableAssets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Assigned</h3>
          <p className="text-3xl font-bold text-red-500">{assignedAssets}</p>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Assignment Management</h1>
        <AssignmentTable
          assignments={assignments}
          refreshAssignments={loadAssignments}
        />
      </div>

      {/* Asset Table */}
      <AssetTable assets={assets} refreshAssets={fetchAssets} />

      {/* Add Asset Modal */}
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          refreshAssets={fetchAssets}
        />
      )}
    </div>
  );
};

export default Dashboard;
