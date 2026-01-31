import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function SearchPage() {
    const [keyword, setKeyword] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (keyword.trim().length == 0) {
            errors.keyword = "Please Enter Keyword";
        }
        if(Object.keys(errors).length > 0) {
            setError(errors);
        } else {
        try {
            const response = await axios.get('http://localhost:3020/api/vehicles/search', { params: { keyword }, headers: { Authorization: localStorage.getItem("token")}});
            console.log(response.data);
            setError({});
            setVehicles(response.data.vehicles);
        } catch(err) {
            console.log(err);
            setVehicles([]);
        }
      }
    }

    return (
        <div className="flex flex-col items-center mt-10 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Search Vehicles</h1>
        <h2 className="text-gray-600 text-lg">Find the vehicle you want quickly</h2>
            { error.keyword && (
                <span style={{ color: "red" }}>{error.keyword}</span>
            )}
            <div className="flex w-full max-w-sm items-center gap-2 justify-center mt-4">
                <form onSubmit={handleSubmit}  className="flex gap-2 mt-4">
                  <Input
                    type="text"
                    placeholder="Search Vehicle"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-80"
                  />
                  <Button type="submit">Search</Button>
                </form>
            </div>
            {vehicles.map((v) => {
                  return (
                    <p key={v._id}>
                      {v.vehicleName} - {v.registrationNumber}
                    </p>
                  )
            })}
        </div>
    )
} 