import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteAsset } from "../services/api";

const AssetTable = ({ assets = [], refreshAssets }) => {
  // Ensure assets is an array using a default value
  const validAssets = Array.isArray(assets) ? assets : [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await deleteAsset(id);
        refreshAssets();
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {validAssets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap">{asset.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    asset.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : asset.status === "Assigned"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {asset.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {asset.owner || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FiEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(asset.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
          {validAssets.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
