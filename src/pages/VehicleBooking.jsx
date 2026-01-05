"use client";

import { Button } from "@/components/ui/button";

export default function VehicleBooking() {
  return (
    <div className="max-w-xl mx-auto border rounded-lg p-4 shadow-md">
      {/* Back Button */}
      <Button variant="default" className="bg-black text-white mb-4 hover:bg-gray-800">
        ← Back to all vehicles
      </Button>

      {/* Vehicle Image & Info */}
      <div className="flex gap-4">
        <img
          src="/vehicle.jpg"
          alt="Vehicle"
          className="w-40 h-28 object-cover rounded"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">Vehicle Name</h2>
          <p className="text-gray-500">Brand / Type / Fuel</p>
          <p className="text-xl font-bold mt-2">₹150 / day</p>
        </div>
      </div>

      {/* Booking Dates */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Pickup Date & Time</label>
          <input
            type="datetime-local"
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Return Date & Time</label>
          <input
            type="datetime-local"
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Book Now Button */}
      <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
        Book Now
      </Button>
      <p className="text-sm text-gray-500 mt-1">
        You will not be charged yet
      </p>
    </div>
  );
}