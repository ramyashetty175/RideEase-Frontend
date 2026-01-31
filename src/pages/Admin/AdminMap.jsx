import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { io } from "socket.io-client";

export default function AdminMap() {
  const mapRef = useRef(null);
  const markersRef = useRef({}); // store all user markers
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([12.9716, 77.5946], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);
    mapRef.current = map;

    // Connect to backend
    const socket = io("http://localhost:3020"); // backend URL
    socketRef.current = socket;

    // Listen for all users' locations
    socket.on("receive-location", (data) => {
      const { id, latitude, longitude } = data;
      console.log("ADMIN RECEIVED:", data); 

      if (markersRef.current[id]) {
        // Update marker if already exists
        markersRef.current[id].setLatLng([latitude, longitude]);
      } else {
        // Create new marker for first time
        markersRef.current[id] = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`User: ${id}`);
      }

      // Optional: center map on latest user update
      map.setView([latitude, longitude]);
    });

    return () => {
      socket.disconnect();
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
}


// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";

// export default function AdminMap() {
//   const mapRef = useRef(null);
//   const markersRef = useRef({});
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const map = L.map(mapRef.current).setView([12.9716, 77.5946], 14);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "Map data © OpenStreetMap contributors",
//     }).addTo(map);

//     const socket = io("http://localhost:3020");
//     socketRef.current = socket;

//     socket.on("receive-location", (data) => {
//       const { id, latitude, longitude } = data;

//       if (markersRef.current[id]) {
//         markersRef.current[id].setLatLng([latitude, longitude]);
//       } else {
//         markersRef.current[id] = L.marker([latitude, longitude])
//           .addTo(map)
//           .bindPopup(`User: ${id}`);
//       }

//       map.setView([latitude, longitude]); // optional
//     });

//     return () => {
//       socket.disconnect();
//       map.remove();
//     };
//   }, []);

//   return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
// }
