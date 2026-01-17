// import { Button } from "@/components/ui/button";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createBooking } from "@/slices/bookingSlice";
// import { useState } from "react";

// export default function VehicleBooking() {
//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [returnLocation, setReturnLocation] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { data } = useSelector((state) => state.vehicle);

//   const vehicle = data.find((v) => v._id === id);

//   if (!vehicle) {
//     return <p className="text-center mt-10">Vehicle not found.</p>;
//   }

//   const handleBooking = () => {
//     if (!startDateTime || !endDateTime) {
//       alert("Please select pickup and return date/time");
//       return;
//     }

//     if (!pickupLocation || !returnLocation) {
//       alert("Please enter pickup and return location");
//       return;
//     }

//     dispatch(
//       createBooking({
//         vehicle: vehicle._id,
//         startDateTime,
//         endDateTime,
//         pickupLocation,
//         returnLocation
//       })
//     );

//     navigate("/bookings");
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       <Button
//         variant="default"
//         className="bg-black text-white mb-6 hover:bg-gray-800"
//         onClick={() => navigate("/vehicles")}
//       >
//         ← Back to all vehicles
//       </Button>

//       <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
//           {vehicle.image ? (
//             <img
//               src={vehicle.image}
//               alt={vehicle.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col justify-between">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               {vehicle.name}
//             </h2>
//             <p className="text-gray-500">
//               {vehicle.brand} / {vehicle.type} / {vehicle.fuelType}
//             </p>
//             <p className="text-2xl font-bold mt-2">
//               ₹1000 / day
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//             <div className="flex flex-col">
//               <label className="text-gray-700 mb-1">
//                 Pickup Date & Time
//               </label>
//               <input
//                 type="datetime-local"
//                 value={startDateTime}
//                 onChange={(e) => setStartDateTime(e.target.value)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-gray-700 mb-1">
//                 Return Date & Time
//               </label>
//               <input
//                 type="datetime-local"
//                 value={endDateTime}
//                 onChange={(e) => setEndDateTime(e.target.value)}
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div className="flex flex-col">
//               <label className="text-gray-700 mb-1">
//                 Pickup Location
//               </label>
//               <input
//                 type="text"
//                 value={pickupLocation}
//                 onChange={(e) => setPickupLocation(e.target.value)}
//                 placeholder="Enter pickup location"
//                 className="border rounded p-2 w-full"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-gray-700 mb-1">
//                 Return Location
//               </label>
//               <input
//                 type="text"
//                 value={returnLocation}
//                 onChange={(e) => setReturnLocation(e.target.value)}
//                 placeholder="Enter return location"
//                 className="border rounded p-2 w-full"
//               />
//             </div>
//           </div>

//           <Button
//             className="w-full bg-blue-600 text-white hover:bg-blue-700"
//             onClick={handleBooking}
//           >
//             Book Now
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/slices/bookingSlice";
import { useState } from "react";
import useRazorpayPayment from "../utils/razopay";

export default function VehicleBooking() {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.vehicle);

  const vehicle = data.find((v) => v._id === id);
  const handlePayment = useRazorpayPayment(); // ✅ hook used correctly

  if (!vehicle) {
    return <p className="text-center mt-10">Vehicle not found.</p>;
  }

  const handleBooking = async () => {
    if (!startDateTime || !endDateTime) {
      alert("Please select pickup and return date/time");
      return;
    }

    if (!pickupLocation || !returnLocation) {
      alert("Please enter pickup and return location");
      return;
    }

    setLoading(true);

    const amount = 1000 * 100; // ₹1000 in paise

    const success = await handlePayment(amount);

    if (success) {
      dispatch(
        createBooking({
          vehicle: vehicle._id,
          startDateTime,
          endDateTime,
          pickupLocation,
          returnLocation,
        })
      );

      alert("Payment successful! Booking confirmed.");
      navigate("/bookings");
    } else {
      alert("Payment failed or cancelled.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Button
        className="bg-black text-white mb-6 hover:bg-gray-800"
        onClick={() => navigate("/vehicles")}
      >
        ← Back to all vehicles
      </Button>

      <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{vehicle.name}</h2>
          <p className="text-gray-500">
            {vehicle.brand} / {vehicle.type} / {vehicle.fuelType}
          </p>
          <p className="text-2xl font-bold mt-2">₹1000 / day</p>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="text"
              placeholder="Return location"
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          <Button
            className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
