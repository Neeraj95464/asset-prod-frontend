// src/components/Modal.jsx
import React, { useState, useEffect } from "react";
import { createAsset, getVendors } from "../services/api";
import { FiX } from "react-icons/fi";

const Modal = ({ closeModal, refreshAssets }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 1,
    serialNumber: "",
    model: "",
    purchaseDate: "",
    warrantyExpiry: "",
    status: "Available",
    assetPrice: 0,
    location: "",
    vendorId: "",
  });

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsData = await getVendors();
        console.log(vendorsData);
        setVendors(Array.isArray(vendorsData) ? vendorsData : []);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createAsset(formData);
      refreshAssets();
      closeModal();
    } catch (error) {
      setError("Error creating asset. Please try again.");
      console.error("Error creating asset:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl h-auto max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Add New Asset</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            {/* Asset Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Asset Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter asset description"
              />
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                required
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="serialNumber"
              >
                Serial Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                required
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="model">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Purchase Date */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="purchaseDate"
              >
                Purchase Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                required
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Warranty Expiry */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="warrantyExpiry"
              >
                Warranty Expiry
              </label>
              <input
                type="date"
                id="warrantyExpiry"
                name="warrantyExpiry"
                value={formData.warrantyExpiry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Status */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Asset Price */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="assetPrice"
              >
                Asset Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="assetPrice"
                name="assetPrice"
                required
                min="0"
                value={formData.assetPrice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Location */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter asset location"
              />
            </div>

            {/* Vendor */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="vendorId"
              >
                Vendor <span className="text-red-500">*</span>
              </label>
              <select
                id="vendorId"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Vendor</option>
                {vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <option key={vendor.vendorId} value={vendor.vendorId}>
                      {vendor.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No vendors available</option>
                )}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Adding..." : "Add Asset"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
