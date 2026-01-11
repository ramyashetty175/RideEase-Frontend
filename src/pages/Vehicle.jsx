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
      <h1 className="text-3xl font-semibold text-gray-700 mb-10">
        Approved Vehicles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {approvedVehicles.map((vehicle) => (
          <Card
            key={vehicle._id}
            className="w-80 rounded-2xl border border-gray-200 shadow-sm"
          >
            <CardContent className="p-4 flex flex-col gap-4">
            
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