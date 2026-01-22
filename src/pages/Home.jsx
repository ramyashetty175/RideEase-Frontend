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





// import { useState } from "react";
// import axios from "axios";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

// export default function Home() {
//   // Search inputs
//   const [keyword, setKeyword] = useState("");
//   const [pickupDateTime, setPickupDateTime] = useState("");
//   const [returnDateTime, setReturnDateTime] = useState("");

//   // Vehicles search results
//   const [vehicles, setVehicles] = useState([]);

//   // Handle search button click
//   const handleSearch = async () => {
//     if (!pickupDateTime || !returnDateTime) {
//       alert("Please select pickup and return date/time");
//       return;
//     }

//     try {
//       const { data } = await axios.get("/api/vehicles/available", {
//         params: {
//           keyword,
//           pickupDateTime,
//           returnDateTime,
//         },
//       });

//       setVehicles(data);
//       if (data.length === 0) {
//         alert("No vehicles available for the selected date/time");
//       }
//     } catch (err) {
//       console.log(err);
//       setVehicles([]);
//       alert(err.response?.data?.message || "Error fetching vehicles");
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center mt-16 gap-6">
//       {/* Search Card */}
//       <Card className="w-full max-w-4xl p-4 rounded-2xl shadow-lg">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
//           {/* Location */}
//           <div className="flex flex-col space-y-2">
//             <Label>Pickup and return location</Label>
//             <Input
//               placeholder="City, address, point of interest"
//               className="h-11"
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//             />
//             <div className="flex items-center gap-2 mt-1">
//               <Checkbox id="same-location" />
//               <Label htmlFor="same-location" className="text-sm text-muted-foreground">
//                 Same return location
//               </Label>
//             </div>
//           </div>

//           {/* Pickup Date & Time */}
//           <div className="flex flex-col space-y-2">
//             <Label>Pickup Date & Time</Label>
//             <Input
//               type="datetime-local"
//               className="h-11"
//               value={pickupDateTime}
//               onChange={(e) => setPickupDateTime(e.target.value)}
//             />
//           </div>

//           {/* Return Date & Time */}
//           <div className="flex flex-col space-y-2">
//             <Label>Return Date & Time</Label>
//             <Input
//               type="datetime-local"
//               className="h-11"
//               value={returnDateTime}
//               onChange={(e) => setReturnDateTime(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Search Button */}
//         <div className="flex justify-end mt-6">
//           <Button className="bg-black text-white h-11 px-6" onClick={handleSearch}>
//             Search
//           </Button>
//         </div>
//       </Card>

//       {/* Vehicles Results */}
//       {vehicles.length > 0 && (
//         <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
//           {vehicles.map((v) => (
//             <Card key={v._id} className="p-4 rounded-2xl shadow hover:shadow-lg transition">
//               <img
//                 src={v.image}
//                 alt={v.vehicleName}
//                 className="w-full h-40 object-cover rounded-xl"
//               />
//               <h2 className="text-lg font-semibold mt-2">{v.vehicleName}</h2>
//               <p className="text-gray-500">{v.brand} / {v.type} / {v.fuelType}</p>
//               <p className="text-xl font-bold mt-1">₹{v.price} / day</p>
//               <Button className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700">
//                 Book Now
//               </Button>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* No vehicles message */}
//       {vehicles.length === 0 && pickupDateTime && returnDateTime && (
//         <p className="text-gray-500 mt-4">No vehicles available for the selected date/time</p>
//       )}
//     </div>
//   );
// }



import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";

export default function UserHome() {
  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-8">

      {/* Welcome Card */}
      <Card className="w-full max-w-5xl bg-white/70 shadow-sm border">
        <div className="flex flex-col md:flex-row items-center justify-between p-8">
          <div className="flex-1">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold">
                Welcome back, User!
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Here’s a quick overview of your bookings and available vehicles.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-500 mb-5">
                You have <strong>3 upcoming bookings</strong>.
              </p>
              <Button className="bg-gray-800 text-white hover:bg-gray-700">
                Explore Vehicles
              </Button>
            </CardContent>
          </div>
          <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
              alt="user dashboard illustration"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </Card>

      <Separator className="w-full max-w-5xl" />

      {/* Stats Cards */}
      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        Your Stats
      </h1>
      <div className="w-full max-w-5xl flex gap-4">
        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-600">9</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="w-full max-w-5xl" />

      {/* Upcoming Bookings */}
      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        Upcoming Bookings
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg font-semibold">Vehicle Name</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-500 text-sm">Pickup: 21 Jan 2026, 10:00 AM</p>
              <p className="text-gray-500 text-sm">Return: 22 Jan 2026, 10:00 AM</p>
              <p className="text-sm font-medium mt-1 text-yellow-600">Pending</p>
              <Button size="sm" className="mt-2">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="w-full max-w-5xl" />

      {/* Suggested Vehicles */}
      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        Suggested Vehicles
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4 text-center">
            <CardHeader className="p-0 mb-1">
              <CardTitle className="text-lg font-semibold">Vehicle Name</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-2">
              <p className="text-gray-500 text-sm">Type: Sedan</p>
              <p className="text-gray-500 text-sm">Status: Available</p>
            </CardContent>
            <Button size="sm">Book Now</Button>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
}
