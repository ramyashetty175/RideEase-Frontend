// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { Separator } from "@/components/ui/separator";

// const vehicles = [
//   { name: "Toyota Corolla", type: "Sedan", status: "Available" },
//   { name: "Honda City", type: "Sedan", status: "In Use" },
//   { name: "Mahindra Thar", type: "SUV", status: "Available" },
//   { name: "Suzuki Swift", type: "Hatchback", status: "Maintenance" },
// ];

// export default function Vehicle() {
//   const { data } = useSelector((state) => state.vehicle);
//   const approvedVehicles = data.filter((vehicle) => vehicle.status === "Approved");

//   return (
//     <div className="w-full flex flex-col items-center mt-10 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">All Vehicles</h1>

//       <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
//         {approvedVehicles.map((vehicle, index) => (
//           <Card
//             key={index}
//             className="flex flex-col items-center justify-center p-4 text-center"
//           >
//             <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mb-2">
//               {vehicle.name.charAt(0)}
//             </div>
//             <CardHeader className="p-0 mb-1">
//               <CardTitle className="text-lg font-semibold">{vehicle.name}</CardTitle>
//             </CardHeader>
//             <CardContent className="p-0 mb-2">
//               <p className="text-gray-500 text-sm">{vehicle.type}</p>
//               <p className="text-gray-500 text-sm">{vehicle.status}</p>
//             </CardContent>
//             <Button size="sm">View</Button>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { Separator } from "@/components/ui/separator";

// export default function Vehicle() {
//   const { data } = useSelector((state) => state.vehicle);

//   const approvedVehicles = data.filter((vehicle) => vehicle.status === "approved");

//   return (
//     <div className="w-full flex flex-col items-center mt-10 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">Approved Vehicles</h1>

//       {approvedVehicles.length === 0 ? (
//         <p className="text-gray-500">No approved vehicles yet.</p>
//       ) : (
//         <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
//           {approvedVehicles.map((vehicle, index) => (
//             <Card
//               key={vehicle._id || index}
//               className="flex flex-col items-center justify-center p-4 text-center"
//             >
//               <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-2">
//                 {vehicle.vehicleNumber?.charAt(0) || vehicle.name?.charAt(0)}
//               </div>
//               <CardHeader className="p-0 mb-1">
//                 <CardTitle className="text-lg font-semibold">{vehicle.vehicleNumber || vehicle.name}</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0 mb-2">
//                 <p className="text-gray-500 text-sm">{vehicle.model || vehicle.type}</p>
//                 <p className="text-green-600 text-sm font-medium">{vehicle.status}</p>
//               </CardContent>
//               <Button size="sm">View</Button>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ApprovedVehicle() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.vehicle);

  const approvedVehicles = data.filter(
    (vehicle) => vehicle.status === "approved"
  );

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-700 mb-10">
        Approved Vehicles
      </h1>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {approvedVehicles.map((vehicle) => (
          <Card
            key={vehicle._id}
            className="w-80 rounded-2xl border border-gray-200 shadow-sm"
          >
            <CardContent className="p-4 flex flex-col gap-4">
              {/* Vehicle Image (Rectangle) */}
              <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100">
                {vehicle.image ? (
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Vehicle Info */}
              <div className="flex flex-col gap-1 text-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  {vehicle.name}
                </h2>

                <p className="text-gray-600">
                  <span className="font-medium">Brand:</span> {vehicle.brand}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Type:</span> {vehicle.type}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Fuel:</span> {vehicle.fuelType}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Transmission:</span>{" "}
                  {vehicle.transmission}
                </p>

                <p
                  className={`text-sm font-medium ${
                    vehicle.availabilityStatus === "Available"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {vehicle.availabilityStatus}
                </p>
              </div>

              {/* Action */}
                <Button
  className="mt-2 w-full bg-gray-700 hover:bg-gray-800"
  onClick={() =>
    navigate(`view/${vehicle._id}`)
  }
>
  View
</Button>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}