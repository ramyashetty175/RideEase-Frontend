"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDistance } from "geolib";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Vehicle() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.vehicle);
  const { user } = useContext(UserContext);
  const role = user?.role;

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [vehiclesToShow, setVehiclesToShow] = useState([]);

  useEffect(() => {
    if (role !== "user") return;

    const savedLocation = sessionStorage.getItem("userLocation");

    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
      return;
    }

    if (navigator.geolocation) {
      setLocationLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(loc);
          sessionStorage.setItem("userLocation", JSON.stringify(loc));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationLoading(false);
        }
      );
    }
  }, [role]);

  useEffect(() => {
    if (role === "user" && locationLoading) return;

    let vehicles = data.filter(
      (vehicle) =>
        vehicle.status === "approved" &&
        vehicle.availabilityStatus === "Available"
    );

    if (role === "user" && userLocation) {
      vehicles = vehicles
        .map((vehicle) => {
          if (!vehicle.location?.coordinates) return null;

          const distance = getDistance(
            { latitude: userLocation.lat, longitude: userLocation.lng },
            {
              latitude: Number(vehicle.location.coordinates[1]),
              longitude: Number(vehicle.location.coordinates[0]),
            }
          );

          return { ...vehicle, distance };
        })
        .filter((v) => v && v.distance <= 5000) 
        .sort((a, b) => a.distance - b.distance);
    }

    setVehiclesToShow(vehicles);
  }, [data, userLocation, role, locationLoading]);


  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold text-gray-700 mb-10">
        {role === "user" ? "Nearby Vehicles (within 5 km)" : "All Vehicles"}
      </h1>

      {role === "user" && locationLoading ? (
        <p className="text-gray-500">Detecting your location...</p>
      ) : vehiclesToShow.length === 0 ? (
        <p className="text-gray-500">
          {role === "user"
            ? "No vehicles found within 5 km radius."
            : "No vehicles available."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {vehiclesToShow.map((vehicle) => (
            <Card
              key={vehicle._id}
              className="w-80 rounded-2xl border border-gray-200 shadow-sm"
            >
              <CardContent className="p-4 flex flex-col gap-4">
                <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100">
                  {vehicle.image && (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1 text-sm text-black">
                  <h2 className="text-lg font-semibold">{vehicle.name}</h2>
                  <p>
                    <span className="font-medium">Brand:</span> {vehicle.brand}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {vehicle.type}
                  </p>
                  <p>
                    <span className="font-medium">Fuel:</span> {vehicle.fuelType}
                  </p>
                  <p>
                    <span className="font-medium">Transmission:</span>{" "}
                    {vehicle.transmission}
                  </p>
                  <p>
                    <span className="font-medium">Availability:</span>{" "}
                    {vehicle.availabilityStatus}
                  </p>

                  {role === "user" && vehicle.distance != null && (
                    <p>
                      <span className="font-medium">Distance:</span>
                      {(vehicle.distance / 1000).toFixed(2)} km
                    </p>
                  )}
                </div>
                <Button
                  className="mt-2 w-full bg-black text-white hover:bg-black"
                  onClick={() => navigate(`view/${vehicle._id}`)}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}