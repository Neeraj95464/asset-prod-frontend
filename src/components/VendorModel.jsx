import React, { useState, useEffect } from "react";

const VendorModal = ({ vendor, closeModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    faxNumber: "",
  });

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        address: vendor.address,
        city: vendor.city,
        state: vendor.state,
        zipCode: vendor.zipCode,
        phoneNumber: vendor.phoneNumber,
        email: vendor.email,
        faxNumber: vendor.faxNumber,
      });
    } else {
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        faxNumber: "",
      }); // Clear form for new vendor
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-screen">
        <h3 className="text-lg font-semibold mb-4">
          {vendor ? "Edit Vendor" : "Add New Vendor"}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Vendor Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor name"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor address"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor city"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor state"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor zip code"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor phone number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor email"
            />
          </div>

          {/* Fax Number */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="faxNumber"
            >
              Fax Number
            </label>
            <input
              type="text"
              id="faxNumber"
              name="faxNumber"
              value={formData.faxNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter vendor fax number"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
            >
              {vendor ? "Update Vendor" : "Add Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorModal;
