// src/components/AssetAssignmentForm.jsx
import React, { useState, useEffect } from "react";
import {
  getAllAssets,
  getEmployees,
  submitAssetAssignment,
} from "../services/api"; // Make sure to import your API functions

const AssetAssignmentForm = ({ onSubmit, assignment }) => {
  const [formData, setFormData] = useState({
    assetId: "",
    personId: "",
    assignmentDate: "",
    returnDate: "",
    status: "ASSIGNED",
    notes: "",
  });

  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  const [searchAsset, setSearchAsset] = useState("");
  const [searchPerson, setSearchPerson] = useState("");

  // Fetch assets and persons on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetData = await getAllAssets();
        setAssets(Array.isArray(assetData) ? assetData : []);
        setFilteredAssets(Array.isArray(assetData) ? assetData : []);

        const personData = await getEmployees();
        setPersons(Array.isArray(personData) ? personData : []);
        setFilteredPersons(Array.isArray(personData) ? personData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Populate formData if there's an assignment to update
  useEffect(() => {
    if (assignment) {
      setFormData({
        assetId: assignment.assetId || "",
        personId: assignment.personId || "",
        assignmentDate: assignment.assignmentDate || "",
        returnDate: assignment.returnDate || "",
        status: assignment.status || "ASSIGNED",
        notes: assignment.notes || "",
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAssetAssignment(formData);
      alert("Asset assignment submitted successfully!");
      onSubmit(formData); // Call the onSubmit prop function if needed
      setFormData({
        assetId: "",
        personId: "",
        assignmentDate: "",
        returnDate: "",
        status: "ASSIGNED",
        notes: "",
      }); // Clear form after submission
    } catch (error) {
      console.error("Error submitting asset assignment:", error);
      alert(error.message);
    }
  };

  // Search and Filter for Assets
  const handleAssetSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchAsset(value);
    const filtered = assets.filter((asset) =>
      asset.name.toLowerCase().includes(value)
    );
    setFilteredAssets(filtered);
  };

  // Search and Filter for Persons
  const handlePersonSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchPerson(value);
    const filtered = persons.filter((person) =>
      person.fullName.toLowerCase().includes(value)
    );
    setFilteredPersons(filtered);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto overflow-auto max-h-[80vh] sm:max-h-none">
      <h3 className="text-lg font-semibold mb-4 text-center text-blue-600">
        {assignment ? "Update Asset Assignment" : "Assign Asset to Employee"}
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Search Asset */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="searchAsset"
          >
            Search Asset
          </label>
          <input
            type="text"
            id="searchAsset"
            name="searchAsset"
            value={searchAsset}
            onChange={handleAssetSearch}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search by asset name"
          />
        </div>

        {/* Asset Selection */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="assetId"
          >
            Select Asset <span className="text-red-500">*</span>
          </label>
          <select
            id="assetId"
            name="assetId"
            required
            value={formData.assetId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              -- Select Asset --
            </option>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <option key={asset.assetId} value={asset.assetId}>
                  {asset.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No assets available
              </option>
            )}
          </select>
        </div>

        {/* Search Person */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="searchPerson"
          >
            Search Employee
          </label>
          <input
            type="text"
            id="searchPerson"
            name="searchPerson"
            value={searchPerson}
            onChange={handlePersonSearch}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search by employee name"
          />
        </div>

        {/* Person Selection */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="personId"
          >
            Select Employee <span className="text-red-500">*</span>
          </label>
          <select
            id="personId"
            name="personId"
            required
            value={formData.personId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              -- Select Employee --
            </option>
            {filteredPersons.length > 0 ? (
              filteredPersons.map((person) => (
                <option key={person.personId} value={person.personId}>
                  {person.fullName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No employees available
              </option>
            )}
          </select>
        </div>

        {/* Assignment Date */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="assignmentDate"
          >
            Assignment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="assignmentDate"
            name="assignmentDate"
            required
            value={formData.assignmentDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Return Date */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="returnDate"
          >
            Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="status"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="ASSIGNED">Assigned</option>
            <option value="RETURNED">Returned</option>
          </select>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="notes"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Add any notes"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() =>
              setFormData({
                assetId: "",
                personId: "",
                assignmentDate: "",
                returnDate: "",
                status: "ASSIGNED",
                notes: "",
              })
            }
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {assignment ? "Update Assignment" : "Assign Asset"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetAssignmentForm;
