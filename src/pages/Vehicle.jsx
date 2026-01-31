"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Vehicle() {
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.vehicle);

    const approvedVehicles = data.filter((vehicle) => vehicle.status === "approved");

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
                  {vehicle.image && (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-black">
                    <h2 className="text-lg font-semibold">
                      {vehicle.name}
                    </h2>
                    <p>
                    <span className="font-medium">Brand: </span> {vehicle.brand}
                  </p>
                  <p>
                    <span className="font-medium">Type: </span> {vehicle.type}
                  </p>
                  <p>
                    <span className="font-medium">Fuel: </span> {vehicle.fuelType}
                  </p>
                  <p>
                    <span className="font-medium">Transmission: </span> {vehicle.transmission}
                  </p>
                  <p>
                    <span className="font-medium">Availability: </span> {vehicle.availabilityStatus}
                  </p>
              </div>
              <Button
                  className="mt-2 w-full bg-black text-white hover:bg-black"
                  onClick={ () => navigate(`view/${vehicle._id}`)}> View </Button>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  )
}