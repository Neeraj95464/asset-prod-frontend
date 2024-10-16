import React, { useState } from "react";
import axios from "axios";

const AssetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 0,
    serialNumber: "",
    model: "",
    purchaseDate: "",
    warrantyExpiry: "",
    status: "ACTIVE", // Default value
    assetPrice: 0,
    location: "",
    vendorId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/assets", formData); // Adjust the API endpoint if necessary
      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        category: "",
        quantity: 0,
        serialNumber: "",
        model: "",
        purchaseDate: "",
        warrantyExpiry: "",
        status: "ACTIVE",
        assetPrice: 0,
        location: "",
        vendorId: "",
      });
    } catch (err) {
      setError("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Asset</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Asset added successfully!</p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Warranty Expiry</label>
            <input
              type="date"
              name="warrantyExpiry"
              value={formData.warrantyExpiry}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="RETIRED">Retired</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Asset Price</label>
            <input
              type="number"
              name="assetPrice"
              value={formData.assetPrice}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Vendor ID</label>
            <input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-full p-2 text-white bg-blue-500 rounded ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Asset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
