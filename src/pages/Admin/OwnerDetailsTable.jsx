"use client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function OwnerDetailsTable() {
  const { id: ownerId } = useParams(); 

  const { data: vehicles } = useSelector((state) => state.vehicle) || { data: [] };
  const { data: bookings } = useSelector((state) => state.booking) || { data: [] };

  const ownerVehicles = vehicles.filter((v) => {
    if (v.owner?._id) return v.owner._id === ownerId; 
    return v.owner === ownerId; 
  });

  const ownerBookings = bookings.filter((b) => {
    if (b.vehicle?.owner?._id) return b.vehicle.owner._id === ownerId;
    return b.vehicle?.owner === ownerId;
  });

  return (
    <div className="space-y-10 p-4">

      <section>
        <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
        {ownerVehicles.length === 0 ? (
          <p className="text-gray-500">No vehicles found</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Brand</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerVehicles.map((v, i) => (
                <tr key={v._id} className="border-t text-sm">
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{v. vehicleName}</td>
                  <td className="px-4 py-2 border">{v.brand}</td>
                  <td className="px-4 py-2 border">{v.type}</td>
                  <td className="px-4 py-2 border">{v.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Bookings</h2>
        {ownerBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Vehicle</th>
                <th className="px-4 py-2 border">Booking Status</th>
                <th className="px-4 py-2 border">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerBookings.map((b, i) => (
                <tr key={b._id} className="border-t text-sm">
                  <td className="px-4 py-2 border">{i + 1}</td>
                  <td className="px-4 py-2 border">{b.user?.username || "N/A"}</td>
                  <td className="px-4 py-2 border">{b.vehicle?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{b.bookingStatus}</td>
                  <td className="px-4 py-2 border">{b.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
