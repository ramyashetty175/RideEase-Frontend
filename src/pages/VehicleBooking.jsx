import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/slices/bookingSlice";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (startDateTime.length == 0) {
            errors.startDateTime = "Pickup date/time are required";
        }
        if(endDateTime.length == 0) {
            errors.endDateTime = "Pickup date/time are required";
        }
        if(pickupLocation.length == 0) {
           errors.pickupLocation = "Pickup location is required";
        }
        if(returnLocation.length == 0) {
          errors.returnLocation = "Return location is required";
        }
        try {
            const response = await axios.get('/api/vehicles/search', { params: { keyword }, headers: { Authorization: localStorage.getItem("token")}});
            console.log(response.data);
            setVehicles(response.data);
        } catch(err) {
            console.log(err);
            setError("No vehicles found");
            setVehicles([]);
        }
    }

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
      <form onSubmit={handleSubmit}>
      <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
          {vehicle.image ? (
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{vehicle.name}</h2>
          <p className="text-gray-500">{vehicle.brand} / {vehicle.type} / {vehicle.fuelType}</p>
          <p className="text-2xl font-bold mt-2">₹{vehicle.pricePerDay} / day</p>
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
          
          { errors.pickupLocation && ( <span style={{ color: "red" }}>{ errors.pickupLocation }</span> )}
          { errors.returnLocation && ( <span style={{ color: "red" }}>{ errors.returnLocation }</span> )}

          <Button
            className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </Button>
        </div>
      </div>
      </form>
    </div>
  )
}








// export default function VehicleBookig() {
//     const [startDateTime, setStartDateTime] = useState("");
//     const [endDateTime, setEndDateTime] = useState("");
//     const [pickupLocation, setPickupLocation] = useState("");
//     const [returnLocation, setReturnLocation] = useState("");
//     const [errors, setErrors] = useState({});
//     const [alert, setAlert] = useState(null);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const { data } = useSelector((state) => state.vehicle);

//   const vehicle = data.find((v) => v._id === id);
//   const handlePayment = useRazorpayPayment();

//   if (!vehicle)  {
//     return <p>Vehicle not found</p>
//   }

//   const showAlert = (type, message, duration = 3000) => {
//     setAlert({ type, message });
//     setTimeout(() => setAlert(null), duration);
//   };

//   const handleBooking = async () => {
//     const validationErrors = {};
//     if (!startDateTime || !endDateTime) validationErrors.date = "Pickup and return date/time are required";
//     if (!pickupLocation) validationErrors.pickupLocation = "Pickup location is required";
//     if (!returnLocation) validationErrors.returnLocation = "Return location is required";

//     const now = new Date();
//     const start = new Date(startDateTime);
//     const end = new Date(endDateTime);

//     if (start <= now) validationErrors.startTime = "Start date/time must be greater than current time";
//     const diffHours = (end - start) / (1000 * 60 * 60);
//     if (diffHours < 24) validationErrors.minBooking = "Booking must be at least 1 day";
//     if (diffHours > 72) validationErrors.maxBooking = "Booking cannot exceed 3 days";

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       const bookingResponse = await dispatch(
//         createBooking({
//           vehicle: vehicle._id,
//           startDateTime,
//           endDateTime,
//           pickupLocation,
//           returnLocation,
//         })
//       ).unwrap();
//       const bookingId = bookingResponse._id;
//       showAlert("success", "Vehicle available! Proceeding to payment...");
//       const amount = vehicle.pricePerDay * 100; 
//       const success = await handlePayment(amount, bookingId);
//       if (!success) {
//         showAlert("error", "Payment failed or cancelled.");
//         setLoading(false);
//         return;
//       }
//       showAlert("success", "Payment successful! Booking confirmed.");
//     } catch (err) {
//       console.log(err);
//         showAlert("error", "vehicle already booked for selected dates");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       {alert && (
//         <Alert
//           variant={alert.type === "error" ? "destructive" : "default"}
//           className="mb-4 flex items-center gap-2"
//         >
//           {alert.type === "error" ? <AlertCircleIcon /> : <CheckCircle2Icon />}
//           <AlertTitle>{alert.message}</AlertTitle>
//         </Alert>
//       )}

//       <Button
//         className="bg-black text-white mb-6 hover:bg-gray-800"
//         onClick={() => navigate("/vehicles")}
//       >
//         Back to all vehicles
//       </Button>

//       <div className="border rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-40 h-40 bg-gray-100 rounded-xl overflow-hidden">
//           {vehicle.image ? (
//             <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
//           ) : (
//             <div className="h-full flex items-center justify-center text-gray-400">No Image</div>
//           )}
//         </div>
//         <div className="flex-1">
//           <h2 className="text-xl font-semibold">{vehicle.name}</h2>
//           <p className="text-gray-500">{vehicle.brand} / {vehicle.type} / {vehicle.fuelType}</p>
//           <p className="text-2xl font-bold mt-2">₹{vehicle.pricePerDay} / day</p>
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
//           {errors.date && <span className="text-red-600">{errors.date}</span>}
//           {errors.startTime && <span className="text-red-600">{errors.startTime}</span>}
//           {errors.minBooking && <span className="text-red-600">{errors.minBooking}</span>}
//           {errors.maxBooking && <span className="text-red-600">{errors.maxBooking}</span>}

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
//           {errors.pickupLocation && <span className="text-red-600">{errors.pickupLocation}</span>}
//           {errors.returnLocation && <span className="text-red-600">{errors.returnLocation}</span>}

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