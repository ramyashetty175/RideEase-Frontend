import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/slices/bookingSlice";
import useRazorpayPayment from "../utils/razopay";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

export default function VehicleBooking() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlePayment = useRazorpayPayment();
    const { id } = useParams();
    const { data } = useSelector((state) => state.vehicle);

    const [form, setForm] = useState({
        startDateTime: '',
        endDateTime: '',
        pickupLocation: '',
        returnLocation: ''
    })

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    
    const vehicle = data.find((v) => v._id === id);

    if(!vehicle) {
        return <p>loading.....</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (form.startDateTime.length == 0) {
            errors.startDateTime = "Pickup date/time are required";
        }
        if(form.endDateTime.length == 0) {
            errors.endDateTime = "Retun date/time are required";
        }
        if(form.pickupLocation.length == 0) {
            errors.pickupLocation = "Pickup location is required";
        }
        if(form.returnLocation.length == 0) {
            errors.returnLocation = "Return location is required";
        }
        const now = new Date();
        const start = new Date(form.startDateTime);
        const end = new Date(form.endDateTime);
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (start <= now) {
            errors.startTime = "Start date/time must be greater than current time";
        }
        const diffHours = (end - start) / (1000 * 60 * 60);
        if (diffHours < 24) {
            errors.minBooking = "Booking must be at least 1 day";
        }
        if (diffHours > 72) {
            errors.maxBooking = "Booking cannot exceed 3 days";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
        try {
            const bookingResponse = await dispatch(createBooking({ vehicle: vehicle._id, startDateTime: form.startDateTime, endDateTime: form.endDateTime, pickupLocation: form.pickupLocation, returnLocation: form.returnLocation }));
            const bookingId = bookingResponse._id;
            setAlert({ type: "success", message: "Vehicle available! Proceeding to payment..." });
            // const amount = vehicle.pricePerDay * 100;
            const amount = vehicle.pricePerDay * diffDays * 100;
            const success = await handlePayment(amount, bookingId);
            if (!success) {
                setAlert({ type: "error", message: "Payment failed or cancelled" });
                setTimeout(() => setAlert(null), 3000);
            }
            setAlert({ type: "success", message: "Payment successful! Booking confirmed." });
            setTimeout(() => setAlert(null), 3000);
            } catch(err) {
                console.log(err);
                setErrors("No vehicles found");
                setAlert({ type: "error", message: "vehicle already booked for selected dates" });
                setTimeout(() => setAlert(null), 3000);
            }
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
                <AlertTitle>
                  {alert.message}
                </AlertTitle>
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
                      { vehicle.image ? (
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
                        value={form.startDateTime}
                        onChange={(e) => setForm({ ...form, startDateTime: e.target.value })}
                        className="border rounded p-2"
                      />
                      <input
                        type="datetime-local"
                        value={form.endDateTime}
                        onChange={(e) => setForm({ ...form, endDateTime: e.target.value })}
                        className="border rounded p-2"
                      />
                    </div>
                    {errors.startDateTime && <span style = {{ color: "red" }}>{errors.startDateTime}</span>}
                    {errors.endDateTime && <span style = {{ color: "red" }}>{errors.endDateTime}</span>}
                    {errors.minBooking && <span style = {{ color: "red" }}>{errors.minBooking}</span>}
                    {errors.maxBooking && <span style = {{ color: "red" }}>{errors.maxBooking}</span>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={form.pickupLocation}
                      onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                      className="border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Return location"
                      value={form.returnLocation}
                      onChange={(e) => setForm({ ...form, returnLocation: e.target.value })}
                      className="border rounded p-2"
                    />
                  </div>
                    { errors.pickupLocation && ( <span style={{ color: "red" }}>{ errors.pickupLocation }</span> )}
                    { errors.returnLocation && ( <span style={{ color: "red" }}>{ errors.returnLocation }</span> )}
                    <Button
                      className="w-full mt-6 bg-black text-white hover:bg-black/90"
                      type="submit"
                    >
                      book Now
                      {/* {loading ? "Processing..." : "Book Now"} */}
                    </Button>
                  </div>
                </div>
            </form>
        </div>
      )
    }