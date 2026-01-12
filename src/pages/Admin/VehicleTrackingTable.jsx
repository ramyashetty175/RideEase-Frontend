"use client";

import { useState, useEffect } from "react";
import axios from "@/config/axios";

export default function VehicleTrackingTable() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/vehicleTrackings"); 
      setVehicles(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Tracking List</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Vehicle Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Speed (km/h)</th>
            <th className="p-2 border">Distance (km)</th>
            <th className="p-2 border">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v._id}>
              <td className="p-2 border">{v.vehicleName || "Unknown"}</td>
              <td className={`p-2 border ${v.status === "moving" ? "text-green-600" : v.status === "parked" ? "text-yellow-600" : "text-red-600"}`}>{v.status}</td>
              <td className="p-2 border">{v.speed}</td>
              <td className="p-2 border">{v.distanceTravelled}</td>
              <td className="p-2 border">{new Date(v.lastUpdatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}