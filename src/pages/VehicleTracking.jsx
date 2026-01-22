import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { io } from "socket.io-client";

export default function VehicleTracking() {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    // Connect Socket.IO
    const socket = io("http://localhost:3020"); // replace with your backend URL

    // Watch user location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("send-location", { latitude, longitude });
          console.log("GPS:", latitude, longitude);
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
      );
    }

    // Initialize map
    const map = L.map(mapRef.current).setView([0, 0], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "jalan Kayu Putih Tengah",
    }).addTo(map);

    // Receive locations
    socket.on("receive-location", (data) => {
      const { id, latitude, longitude } = data;
      map.setView([latitude, longitude]);

      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([latitude, longitude]);
      } else {
        markersRef.current[id] = L.marker([latitude, longitude]).addTo(map);
      }
    });

    // Handle disconnections
    socket.on("user-disconnected", (id) => {
      if (markersRef.current[id]) {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    return () => {
      socket.disconnect();
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}