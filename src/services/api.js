// src/services/api.js
import axios from "axios";

// Replace with your actual backend API URL
const API_URL = "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getAssets = async () => {
  const response = await API_URL.get("/assets"); // Replace with correct endpoint
  return response.data;
};

export const getPersons = async () => {
  const response = await API_URL.get("/persons"); // Replace with correct endpoint
  return response.data;
};
export const fetchAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/assignments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};
export const deleteAssignment = async () => {
  const response = await API_URL.get("/assignments"); // Replace with correct endpoint
  return response.data;
};

export const createVendor = async (vendorData) => {
  const response = await axios.post("vendors", vendorData);
  return response.data;
};

export const updateVendor = async (vendorId, vendorData) => {
  const response = await axios.put(`vendors/${vendorId}`, vendorData);
  return response.data;
};

// Create a new asset
export const createAsset = async (assetData) => {
  const response = await axios.post("/assets", assetData);
  return response.data;
};

// Get all vendors
export const getVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}/vendors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
export const createEmployee = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
export const updateEmployee = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
export const submitAssetAssignment = async (assetAssignmentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/assignments`,
      assetAssignmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting asset assignment:", error);
    throw error;
  }
};

// Fetch all assets
export const getAllAssets = async () => {
  const response = await api.get("/assets");
  return response.data;
};

// Delete an asset
export const deleteAsset = async (id) => {
  const response = await api.delete(`/assets/${id}`);
  return response.data;
};

// Additional API methods can be added here (e.g., updateAsset, getAssetById)
