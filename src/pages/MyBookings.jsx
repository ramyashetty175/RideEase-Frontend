"use client";

import { useSelector } from "react-redux";

export default function MyBookings() {
    const { data } = useSelector((state) => state.booking);

    if (data.length == 0) {
        return <p className="text-center mt-10">No bookings found</p>;
    }
 
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">My Bookings</h2>
        {data.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-xl p-4 flex gap-4 items-center"
          >
          <img
            src={booking.vehicle?.image}
            alt={booking.vehicle?.name}
            className="w-32 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{booking.vehicle.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(booking.startDateTime).toLocaleString()}
              {new Date(booking.endDateTime).toLocaleString()}
            </p>
            <p className="text-sm">Status: {booking.bookingStatus}</p>
            <p className="font-semibold mt-1">{booking.totalAmount}</p>
          </div>
        </div>
      ))}
    </div>
  )
}