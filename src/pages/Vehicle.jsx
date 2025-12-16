import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const vehicles = [
  { name: "Toyota Corolla", type: "Sedan", status: "Available" },
  { name: "Honda City", type: "Sedan", status: "In Use" },
  { name: "Mahindra Thar", type: "SUV", status: "Available" },
  { name: "Suzuki Swift", type: "Hatchback", status: "Maintenance" },
];

export default function Vehicle() {
  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">All Vehicles</h1>

      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {vehicles.map((vehicle, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mb-2">
              {vehicle.name.charAt(0)}
            </div>
            <CardHeader className="p-0 mb-1">
              <CardTitle className="text-lg font-semibold">{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-2">
              <p className="text-gray-500 text-sm">{vehicle.type}</p>
              <p className="text-gray-500 text-sm">{vehicle.status}</p>
            </CardContent>
            <Button size="sm">View</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}