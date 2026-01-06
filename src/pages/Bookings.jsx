"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function Bookings() {
  const { bookings } = useSelector((state) => state.booking);

  if (!bookings || bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No bookings found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6"
          >
            {/* Vehicle Image */}
            <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              {booking.vehicle.image ? (
                <img
                  src={booking.vehicle.image}
                  alt={booking.vehicle.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Booking Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {booking.vehicle.name}
                </h2>
                <p className="text-gray-500">
                  {booking.vehicle.brand}
                </p>

                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Pickup:</span>{" "}
                    {new Date(booking.pickupDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Return:</span>{" "}
                    {new Date(booking.returnDate).toLocaleString()}
                  </p>
                </div>

                <p className="text-lg font-bold mt-3">
                  ₹{booking.totalPrice}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4 flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {booking.status}
                </span>

                <Button variant="outline">View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
