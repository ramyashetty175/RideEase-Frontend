// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function SearchPage() {
//   return (
//     <div className="flex flex-col items-center mt-10 space-y-4">
//       <h1 className="text-3xl font-bold text-gray-900">Search Vehicles</h1>
//       <h2 className="text-gray-600 text-lg">Find the vehicle you want quickly</h2>
//       <div className="flex w-full max-w-sm items-center gap-2 justify-center mt-4">
//         <Input type="text" placeholder="Vehicle name" className="flex-1" />
//         <Button type="submit" variant="default" className="bg-black text-white">
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }

    try {
      setError("");

      const res = await axios.get(
        "http://localhost:3020/api/vehicles/search",
        {
          params: { keyword },
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setVehicles(res.data);
    } catch (err) {
      // simple generic message only
      setError("No vehicles found");
      setVehicles([]);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <h1 className="text-3xl font-bold">Search Vehicles</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm gap-2"
      >
        <Input
          type="text"
          placeholder="Vehicle name or reg number"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-2xl space-y-3">
        {vehicles.map((v) => (
          <div key={v._id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{v.vehicleName}</h3>
            <p className="text-sm text-gray-600">
              {v.registrationNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}