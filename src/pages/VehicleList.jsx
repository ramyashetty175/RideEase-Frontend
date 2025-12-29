"use client"

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { useSelector } from "react-redux";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export const columns = [
  { accessorKey: "_id", header: "ID" },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div className="flex gap-2">
          {vehicle.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Vehicle ${idx}`}
              className="w-24 h-16 object-cover border rounded"
            />
          ))}
        </div>
      );
    },
  },
  { accessorKey: "vehicleName", header: "Vehicle Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "registrationNumber", header: "Registration Number" },
  { accessorKey: "owner", header: "Owner" },
  
   {
  accessorKey: "insuranceVerified",
  header: "Insurance",
  cell: ({ row }) => {
    const owner = row.original

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(owner.insuranceDoc, "_blank")}
      >
        View
      </Button>
    )
  },
},
  {
  accessorKey: "insuranceVerified",
  header: "Insurance",
  cell: ({ row }) => {
    const owner = row.original

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(owner.insuranceDoc, "_blank")}
      >
        View
      </Button>
    )
  },
},
  { accessorKey: "fuelType", header: "Fuel Type" },
  { accessorKey: "transmission", header: "Transmission" },
  { accessorKey: "seats", header: "Seats" },
  { accessorKey: "pricePerDay", header: "Price Per Day" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "availabilityStatus", header: "Availability Status" },
  { accessorKey: "isApproved", header: "Approved" },
  { accessorKey: "averageRating", header: "Average Rating" },
]

export default function VehicleList() {
    const { data } = useSelector((state) => {
      return state.vehicle;
    })
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4">
              <DataTable columns={columns} data={data} />
            </main>
        </SidebarProvider>
    )
}