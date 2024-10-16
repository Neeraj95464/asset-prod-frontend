// src/pages/Assets.jsx
import React, { useEffect, useState } from "react";
import { getAllAssets } from "../services/api";
import AssetTable from "../components/AssetTable";

const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAllAssets();
      setAssets(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Assets</h2>
      <AssetTable assets={assets} refreshAssets={fetchAssets} />
    </div>
  );
};

export default Assets;
