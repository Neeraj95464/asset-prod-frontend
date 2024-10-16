import React, { useState, useEffect } from "react";
import { getVendors, createVendor, updateVendor } from "../services/api";
import VendorModal from "./VendorModel"; // Corrected the import

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorData = await getVendors();
        if (Array.isArray(vendorData)) {
          setVendors(vendorData);
        } else {
          console.log(vendorData);
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Error fetching vendors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const handleAddVendor = () => {
    setSelectedVendor(null);
    setShowModal(true);
  };

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  const handleVendorSubmit = async (vendorData) => {
    try {
      if (selectedVendor) {
        await updateVendor(selectedVendor.vendorId, vendorData);
      } else {
        await createVendor(vendorData);
      }
      const updatedVendors = await getVendors();
      if (Array.isArray(updatedVendors)) {
        setVendors(updatedVendors);
      } else {
        throw new Error("Unexpected data format");
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving vendor:", error);
      setError("Error saving vendor. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Vendor Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleAddVendor}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-150"
          >
            Add New Vendor
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">City</th>
                  <th className="border border-gray-300 p-2">State</th>
                  <th className="border border-gray-300 p-2">Zip Code</th>
                  <th className="border border-gray-300 p-2">Phone Number</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(vendors) && vendors.length > 0 ? (
                  vendors.map((vendor) => (
                    <tr
                      key={vendor.vendorId}
                      className="hover:bg-gray-100 transition duration-150"
                    >
                      <td className="border border-gray-300 p-2">
                        {vendor.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.address}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.city}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.state}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.zipCode}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.phoneNumber}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {vendor.email}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleEditVendor(vendor)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-150"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-gray-300 p-2 text-center"
                    >
                      No vendors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showModal && (
        <VendorModal
          vendor={selectedVendor}
          closeModal={handleCloseModal}
          onSubmit={handleVendorSubmit}
        />
      )}
    </div>
  );
};

export default VendorManagement;
