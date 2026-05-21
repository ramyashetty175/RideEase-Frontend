// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// export default function VehicleTracking() {
//   const mapRef = useRef(null);
//   const markersRef = useRef({});

//   useEffect(() => {
//     // Connect Socket.IO
//     // const socket = io("https://rideease-backend-zs0m.onrender.com"); // replace with your backend URL
//     const socket = io("http://localhost:3020");

//     // Watch user location
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           socket.emit("send-location", { latitude, longitude });
//           console.log("GPS:", latitude, longitude);
//         },
//         (error) => console.error(error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
//       );
//     }

//     // Initialize map
//     const map = L.map(mapRef.current).setView([0, 0], 16);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "jalan Kayu Putih Tengah",
//     }).addTo(map);

//     // Receive locations
//     socket.on("receive-location", (data) => {
//       const { id, latitude, longitude } = data;
//       map.setView([latitude, longitude]);

//       if (markersRef.current[id]) {
//         markersRef.current[id].setLatLng([latitude, longitude]);
//       } else {
//         markersRef.current[id] = L.marker([latitude, longitude]).addTo(map);
//       }
//     });

//     // Handle disconnections
//     socket.on("user-disconnected", (id) => {
//       if (markersRef.current[id]) {
//         map.removeLayer(markersRef.current[id]);
//         delete markersRef.current[id];
//       }
//     });

//     return () => {
//       socket.disconnect();
//       map.remove();
//     };
//   }, []);

//   return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
// }






import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

export default function VehicleTracking() {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const mapInitialized = useRef(false);

  const [booking, setBooking] = useState(null);

  useEffect(() => {

    /*
      GET ACTIVE BOOKING
      Replace with API later
    */
    const activeBooking = JSON.parse(
      localStorage.getItem("activeBooking")
    );

    if (!activeBooking) {
      console.log("No active booking found");
      return;
    }

    setBooking(activeBooking);

  }, []);

  useEffect(() => {

    if (!booking) return;

    /*
      SOCKET CONNECTION
    */
    const socket = io("https://rideease-backend-zs0m.onrender.com");

    /*
      JOIN OWNER ROOM
    */
    socket.emit("join-owner-room", booking.ownerId);

    /*
      INITIALIZE MAP
    */
    const map = L.map(mapRef.current).setView([0, 0], 16);

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "OpenStreetMap"
      }
    ).addTo(map);

    /*
      START GPS TRACKING
    */
    let watchId;

    if (navigator.geolocation) {

      watchId = navigator.geolocation.watchPosition(

        (position) => {

          const {
            latitude,
            longitude,
            speed
          } = position.coords;

          /*
            SEND LOCATION TO BACKEND
          */
          socket.emit("send-location", {
            ownerId: booking.ownerId,
            bookingId: booking.bookingId,
            userId: booking.userId,
            vehicleId: booking.vehicleId,
            latitude,
            longitude,
            speed
          });

          console.log(
            "Vehicle:",
            booking.vehicleId,
            "GPS:",
            latitude,
            longitude,
            "Speed:",
            speed
          );

        },

        (error) => {
          console.error("GPS Error:", error);
        },

        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0
        }

      );

    }

    /*
      RECEIVE VEHICLE LOCATIONS
    */
    socket.on("receive-location", (data) => {

      const {
        vehicleId,
        latitude,
        longitude
      } = data;

      /*
        SET INITIAL CENTER ONCE
      */
      if (!mapInitialized.current) {

        map.setView([latitude, longitude], 16);

        mapInitialized.current = true;

      }

      /*
        UPDATE EXISTING MARKER
      */
      if (markersRef.current[vehicleId]) {

        markersRef.current[vehicleId]
          .setLatLng([latitude, longitude]);

      }

      /*
        CREATE NEW MARKER
      */
      else {

        markersRef.current[vehicleId] =
          L.marker([latitude, longitude]).addTo(map);

      }

    });

    /*
      CLEANUP
    */
    return () => {

      socket.disconnect();

      map.remove();

      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }

    };

  }, [booking]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100vh",
        width: "100%"
      }}
    />
  );

}