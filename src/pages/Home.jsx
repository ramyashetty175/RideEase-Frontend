// import { Card } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

// export default function Home() {
//   return (
//     <div className="w-full flex justify-center mt-16">
//       <Card className="w-full max-w-4xl p-4 rounded-2xl shadow-lg">
    
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

//           <div className="flex flex-col space-y-2">
//             <Label>Pickup and return location</Label>
//             <Input
//               placeholder="City, address, point of interest"
//               className="h-11"
//             />

//             <div className="flex items-center gap-2 mt-1">
//               <Checkbox id="same-location" />
//               <Label
//                 htmlFor="same-location"
//                 className="text-sm text-muted-foreground"
//               >
//                 Same return location
//               </Label>
//             </div>
//           </div>

//           <div className="flex flex-col space-y-2">
//             <Label>Pickup Date & Time</Label>
//             <Input type="datetime-local" className="h-11" />
//           </div>

//           <div className="flex flex-col space-y-2">
//             <Label>Return Date & Time</Label>
//             <Input type="datetime-local" className="h-11" />
//           </div>

//         </div>
//         <div className="flex justify-end mt-6">
//            <Button className="bg-black text-white h-11 px-6">
//               Search
//            </Button>
//         </div>
//       </Card>
//     </div>
//   )
// }



import { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  // Search inputs
  const [keyword, setKeyword] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [returnDateTime, setReturnDateTime] = useState("");

  // Vehicles search results
  const [vehicles, setVehicles] = useState([]);

  // Handle search button click
  const handleSearch = async () => {
    if (!pickupDateTime || !returnDateTime) {
      alert("Please select pickup and return date/time");
      return;
    }

    try {
      const { data } = await axios.get("/api/vehicles/available", {
        params: {
          keyword,
          pickupDateTime,
          returnDateTime,
        },
      });

      setVehicles(data);
      if (data.length === 0) {
        alert("No vehicles available for the selected date/time");
      }
    } catch (err) {
      console.log(err);
      setVehicles([]);
      alert(err.response?.data?.message || "Error fetching vehicles");
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-16 gap-6">
      {/* Search Card */}
      <Card className="w-full max-w-4xl p-4 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* Location */}
          <div className="flex flex-col space-y-2">
            <Label>Pickup and return location</Label>
            <Input
              placeholder="City, address, point of interest"
              className="h-11"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-1">
              <Checkbox id="same-location" />
              <Label htmlFor="same-location" className="text-sm text-muted-foreground">
                Same return location
              </Label>
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="flex flex-col space-y-2">
            <Label>Pickup Date & Time</Label>
            <Input
              type="datetime-local"
              className="h-11"
              value={pickupDateTime}
              onChange={(e) => setPickupDateTime(e.target.value)}
            />
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col space-y-2">
            <Label>Return Date & Time</Label>
            <Input
              type="datetime-local"
              className="h-11"
              value={returnDateTime}
              onChange={(e) => setReturnDateTime(e.target.value)}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end mt-6">
          <Button className="bg-black text-white h-11 px-6" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Card>

      {/* Vehicles Results */}
      {vehicles.length > 0 && (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {vehicles.map((v) => (
            <Card key={v._id} className="p-4 rounded-2xl shadow hover:shadow-lg transition">
              <img
                src={v.image}
                alt={v.vehicleName}
                className="w-full h-40 object-cover rounded-xl"
              />
              <h2 className="text-lg font-semibold mt-2">{v.vehicleName}</h2>
              <p className="text-gray-500">{v.brand} / {v.type} / {v.fuelType}</p>
              <p className="text-xl font-bold mt-1">₹{v.price} / day</p>
              <Button className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700">
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* No vehicles message */}
      {vehicles.length === 0 && pickupDateTime && returnDateTime && (
        <p className="text-gray-500 mt-4">No vehicles available for the selected date/time</p>
      )}
    </div>
  );
}
