"use client";

import { useEffect, useState } from "react";
import axios from "@/config/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function VehicleTrackingMap() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("/api/vehicleTrackings"); 
      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[600px] w-full p-4">
      <MapContainer center={[20, 77]} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.map((v) => (
          <Marker
            key={v._id}
            position={[v.latitude || 0, v.longitude || 0]}
          >
            <Popup>
              <div>
                <p><strong>{v.vehicleName || "Unknown Vehicle"}</strong></p>
                <p>Status: {v.status}</p>
                <p>Speed: {v.speed} km/h</p>
                <p>Distance: {v.distanceTravelled} km</p>
                <p>Last Updated: {new Date(v.lastUpdatedAt).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}