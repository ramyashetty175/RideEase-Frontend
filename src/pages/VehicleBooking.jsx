"use client";

import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/slices/bookingSlice";

import { useState } from "react";

const [startDateTime, setStartDateTime] = useState("");
const [endDateTime, setEndDateTime] = useState("");

export default function VehicleBooking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // vehicle id from URL
  const { data } = useSelector((state) => state.vehicle);

  // Find the vehicle by id
  const vehicle = data.find((v) => v._id === id);

  if (!vehicle) {
    return <p className="text-center mt-10">Vehicle not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      {/* Back Button */}
      <Button
        variant="default"
        className="bg-black text-white mb-6 hover:bg-gray-800"
        onClick={() => navigate("/vehicles")}
      >
        ← Back to all vehicles
      </Button>

      {/* Vehicle Card */}
      <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Vehicle Image */}
        <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Vehicle Info + Booking */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Vehicle Info */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {vehicle.name}
            </h2>
            <p className="text-gray-500">{`${vehicle.brand} / ${vehicle.type} / ${vehicle.fuelType}`}</p>
            <p className="text-2xl font-bold mt-2">₹{vehicle.price} 1000 / day</p>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Pickup Date & Time</label>
              <input
                type="datetime-local"
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Return Date & Time</label>
              <input
                type="datetime-local"
                className="border rounded p-2 w-full"
              />
            </div>
          </div>

          <Button
  className="w-full bg-blue-600 text-white hover:bg-blue-700"
  onClick={() => {
    dispatch(createBooking({ vehicle, pickupDate, returnDate }));
    navigate("/bookings");
  }}
>
  Book Now
</Button>

        </div>
      </div>
    </div>
  );
}