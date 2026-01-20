// import { Button } from "@/components/ui/button";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createBooking, checkAvailabilityBooking } from "@/slices/bookingSlice";
// import { useState } from "react";
// import useRazorpayPayment from "../utils/razopay";

// export default function VehicleBooking() {
//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [returnLocation, setReturnLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { data } = useSelector((state) => state.vehicle);

//   const vehicle = data.find((v) => v._id === id);
//   const handlePayment = useRazorpayPayment(); 

//   if (!vehicle) {
//     return <p className="text-center mt-10">Vehicle not found.</p>;
//   }

//   const handleBooking = async () => {
//     if (!startDateTime || !endDateTime) {
//       alert("Please select pickup and return date/time");
//       return;
//     }

//     if (!pickupLocation || !returnLocation) {
//       alert("Please enter pickup and return location");
//       return;
//     }

//     const now = new Date();
//   const start = new Date(startDateTime);
//   const end = new Date(endDateTime);

//   if (start <= now) {
//     alert("Start date/time must be greater than current time!");
//     return;
//   }

//   const diffHours = (end - start) / (1000 * 60 * 60); 
//   if (diffHours < 24) {
//     alert("Booking must be at least 1 day!");
//     return;
//   }

//   if (diffHours > 72) {
//     alert("Booking cannot exceed 3 days!");
//     return;
//   }
  
//     setLoading(true);

//     try {
//     const availabilityResponse = await dispatch(
//       checkAvailabilityBooking({
//         editId: vehicle._id,
//         formData: { startDateTime, endDateTime }
//       })
//     ).unwrap();
//      console.log(availabilityResponse);

//     if (availabilityResponse.available) {
//       alert("No bookings exist for this vehicle. You can book it!");
//     } else {
//       alert(availabilityResponse.message);
//       setLoading(false);
//       return;
//     }

//     const amount = vehicle.pricePerDay * 100; 

//     const success = await handlePayment(amount);

//     if (success) {
//       dispatch(
//         createBooking({
//           vehicle: vehicle._id,
//           startDateTime,
//           endDateTime,
//           pickupLocation,
//           returnLocation,
//         })
//       );

//       alert("Payment successful! Booking confirmed.");
//       navigate("/bookings");
//     }
//    } catch (err) {
//     alert(err);
//    }
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       <Button
//         className="bg-black text-white mb-6 hover:bg-gray-800"
//         onClick={() => navigate("/vehicles")}
//       >
//         ← Back to all vehicles
//       </Button>

//       <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
//         {/* Image */}
//         <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
//           {vehicle.image ? (
//             <img
//               src={vehicle.image}
//               alt={vehicle.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold">{vehicle.name}</h2>
//           <p className="text-gray-500">
//             {vehicle.brand} / {vehicle.type} / {vehicle.fuelType}
//           </p>
//           <p className="text-2xl font-bold mt-2">₹{vehicle.pricePerDay} / day</p>

//           {/* Dates */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             <input
//               type="datetime-local"
//               value={startDateTime}
//               onChange={(e) => setStartDateTime(e.target.value)}
//               className="border rounded p-2"
//             />
//             <input
//               type="datetime-local"
//               value={endDateTime}
//               onChange={(e) => setEndDateTime(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>

//           {/* Locations */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             <input
//               type="text"
//               placeholder="Pickup location"
//               value={pickupLocation}
//               onChange={(e) => setPickupLocation(e.target.value)}
//               className="border rounded p-2"
//             />
//             <input
//               type="text"
//               placeholder="Return location"
//               value={returnLocation}
//               onChange={(e) => setReturnLocation(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>

//           <Button
//             className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
//             onClick={handleBooking}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Book Now"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createBooking, checkAvailabilityBooking } from "@/slices/bookingSlice";
// import useRazorpayPayment from "../utils/razopay";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// export default function VehicleBooking() {
//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [returnLocation, setReturnLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Error and success state
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { data } = useSelector((state) => state.vehicle);

//   const vehicle = data.find((v) => v._id === id);
//   const handlePayment = useRazorpayPayment();

//   if (!vehicle) return <p className="text-center mt-10">Vehicle not found.</p>;

//   // Custom validations
//   const validateBooking = () => {
//     const validationErrors = {};
//     const now = new Date();
//     const start = new Date(startDateTime);
//     const end = new Date(endDateTime);
//     const diffHours = (end - start) / (1000 * 60 * 60);

//     if (!startDateTime) validationErrors.startDateTime = "Pickup date/time is required.";
//     if (!endDateTime) validationErrors.endDateTime = "Return date/time is required.";
//     if (!pickupLocation) validationErrors.pickupLocation = "Pickup location is required.";
//     if (!returnLocation) validationErrors.returnLocation = "Return location is required.";
//     if (start <= now) validationErrors.startDateTime = "Start date/time must be in the future.";
//     if (diffHours < 24) validationErrors.endDateTime = "Booking must be at least 1 day.";
//     if (diffHours > 72) validationErrors.endDateTime = "Booking cannot exceed 3 days.";

//     return validationErrors;
//   };

//   const handleBooking = async () => {
//     setErrors({});
//     setSuccessMessage("");

//     const validationErrors = validateBooking();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       // Check availability
//       const availabilityResponse = await dispatch(
//         checkAvailabilityBooking({
//           editId: vehicle._id,
//           formData: { startDateTime, endDateTime },
//         })
//       ).unwrap();

//       if (!availabilityResponse.available) {
//         setErrors({ availability: availabilityResponse.message });
//         setLoading(false);
//         return;
//       }

//       // Vehicle is available
//       setSuccessMessage(availabilityResponse.message);

//       // Process payment
//       const amount = vehicle.pricePerDay * 100; 
//       const paymentSuccess = await handlePayment(amount);

//       if (!paymentSuccess) {
//         setErrors({ payment: "Payment failed or cancelled." });
//         setLoading(false);
//         return;
//       }

//       // Create booking
//       await dispatch(
//         createBooking({
//           vehicle: vehicle._id,
//           startDateTime,
//           endDateTime,
//           pickupLocation,
//           returnLocation,
//         })
//       ).unwrap();

//       setSuccessMessage("Payment successful! Booking confirmed.");
//       navigate("/bookings");
//     } catch (err) {
//       setErrors({ general: err?.message || "Something went wrong!" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       <Button className="bg-black text-white mb-6 hover:bg-gray-800" onClick={() => navigate("/vehicles")}>
//         ← Back to all vehicles
//       </Button>

//       {/* Display Errors */}
//       {Object.keys(errors).map((key) => (
//         <Alert key={key} variant="destructive" className="mb-4">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{errors[key]}</AlertDescription>
//         </Alert>
//       ))}

//       {/* Display Success */}
//       {successMessage && (
//         <Alert variant="default" className="mb-4">
//           <AlertTitle>Success</AlertTitle>
//           <AlertDescription>{successMessage}</AlertDescription>
//         </Alert>
//       )}

//       <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
//         {/* Vehicle Image */}
//         <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
//           {vehicle.image ? (
//             <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
//           ) : (
//             <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
//           )}
//         </div>

//         {/* Vehicle Details */}
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold">{vehicle.name}</h2>
//           <p className="text-gray-500">
//             {vehicle.brand} / {vehicle.type} / {vehicle.fuelType}
//           </p>
//           <p className="text-2xl font-bold mt-2">₹{vehicle.pricePerDay} / day</p>

//           {/* Date Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             <input
//               type="datetime-local"
//               value={startDateTime}
//               onChange={(e) => setStartDateTime(e.target.value)}
//               className="border rounded p-2"
//             />
//             <input
//               type="datetime-local"
//               value={endDateTime}
//               onChange={(e) => setEndDateTime(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>

//           {/* Location Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             <input
//               type="text"
//               placeholder="Pickup location"
//               value={pickupLocation}
//               onChange={(e) => setPickupLocation(e.target.value)}
//               className="border rounded p-2"
//             />
//             <input
//               type="text"
//               placeholder="Return location"
//               value={returnLocation}
//               onChange={(e) => setReturnLocation(e.target.value)}
//               className="border rounded p-2"
//             />
//           </div>

//           <Button
//             className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
//             onClick={handleBooking}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Book Now"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, checkAvailabilityBooking } from "@/slices/bookingSlice";
import useRazorpayPayment from "../utils/razopay";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

export default function VehicleBooking() {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data } = useSelector((state) => state.vehicle);

  const vehicle = data.find((v) => v._id === id);
  const handlePayment = useRazorpayPayment();

  if (!vehicle) return <p className="text-center mt-10">Vehicle not found.</p>;

  const showAlert = (type, message, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), duration);
  };

  const handleBooking = async () => {
    // Frontend validation
    const validationErrors = {};
    if (!startDateTime || !endDateTime) validationErrors.date = "Pickup and return date/time are required";
    if (!pickupLocation) validationErrors.pickupLocation = "Pickup location is required";
    if (!returnLocation) validationErrors.returnLocation = "Return location is required";

    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (start <= now) validationErrors.startTime = "Start date/time must be greater than current time";
    const diffHours = (end - start) / (1000 * 60 * 60);
    if (diffHours < 24) validationErrors.minBooking = "Booking must be at least 1 day";
    if (diffHours > 72) validationErrors.maxBooking = "Booking cannot exceed 3 days";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Step 1: Check availability
      const availabilityResponse = await dispatch(
        checkAvailabilityBooking({
          editId: vehicle._id,
          formData: { startDateTime, endDateTime },
        })
      ).unwrap();

      if (!availabilityResponse.available) {
        showAlert("error", "Vehicle not available for selected dates");
        setLoading(false);
        return;
      }

      showAlert("success", "Vehicle is available! Proceeding to payment...");

      // Step 2: Proceed to Razorpay payment
      const amount = vehicle.pricePerDay * 100; // amount in paise
      const success = await handlePayment(amount);

      if (success) {
        // Step 3: Create booking after successful payment
        await dispatch(
          createBooking({
            vehicle: vehicle._id,
            startDateTime,
            endDateTime,
            pickupLocation,
            returnLocation,
          })
        ).unwrap();

        showAlert("success", "Payment successful! Booking confirmed.");
      } else {
        showAlert("error", "Payment failed or cancelled.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      showAlert("error", "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      {alert && (
        <Alert
          variant={alert.type === "error" ? "destructive" : "default"}
          className="mb-4 flex items-center gap-2"
        >
          {alert.type === "error" ? <AlertCircleIcon /> : <CheckCircle2Icon />}
          <AlertTitle>{alert.message}</AlertTitle>
        </Alert>
      )}

      <Button
        className="bg-black text-white mb-6 hover:bg-gray-800"
        onClick={() => navigate("/vehicles")}
      >
        Back to all vehicles
      </Button>

      <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
          {vehicle.image ? (
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{vehicle.name}</h2>
          <p className="text-gray-500">{vehicle.brand} / {vehicle.type} / {vehicle.fuelType}</p>
          <p className="text-2xl font-bold mt-2">₹{vehicle.pricePerDay} / day</p>

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
          {errors.date && <span className="text-red-600">{errors.date}</span>}
          {errors.startTime && <span className="text-red-600">{errors.startTime}</span>}
          {errors.minBooking && <span className="text-red-600">{errors.minBooking}</span>}
          {errors.maxBooking && <span className="text-red-600">{errors.maxBooking}</span>}

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
          {errors.pickupLocation && <span className="text-red-600">{errors.pickupLocation}</span>}
          {errors.returnLocation && <span className="text-red-600">{errors.returnLocation}</span>}

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
