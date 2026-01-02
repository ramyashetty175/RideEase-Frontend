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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignEditId } from "../slices/vehicleSlice";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

// export const columns = [
//   { accessorKey: "_id", header: "ID" },
//   {
//   accessorKey: "image",
//   header: "Image",
//   size: 220, 
//   cell: ({ row }) => {
//     const vehicle = row.original;
//     return (
//       <div className="w-[200px]">
//         <img
//           src={vehicle.image}
//           alt="Vehicle"
//           className="w-full h-24 object-cover rounded border"
//         />
//       </div>
//     );
//   },
// },
//   { accessorKey: "vehicleName", header: "Vehicle Name" },
//   { accessorKey: "type", header: "Type" },
//   { accessorKey: "brand", header: "Brand" },
//   { accessorKey: "registrationNumber", header: "Registration Number" },
//   { accessorKey: "owner", header: "Owner" },
  
//    {
//   accessorKey: "licenseVerified",
//   header: "License",
//   cell: ({ row }) => {
//     const owner = row.original

//     return (
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => window.open(owner.licenseDoc, "_blank")}
//       >
//         View
//       </Button>
//     )
//   },
// },
//   {
//   accessorKey: "insuranceVerified",
//   header: "Insurance",
//   cell: ({ row }) => {
//     const owner = row.original

//     return (
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => window.open(owner.insuranceDoc, "_blank")}
//       >
//         View
//       </Button>
//     )
//   },
//   },
//   { accessorKey: "fuelType", header: "Fuel Type" },
//   { accessorKey: "transmission", header: "Transmission" },
//   { accessorKey: "seats", header: "Seats" },
//   { accessorKey: "pricePerDay", header: "Price Per Day" },
//   { accessorKey: "location", header: "Location" },
//   { accessorKey: "availabilityStatus", header: "Availability Status" },
//   { accessorKey: "isApproved", header: "Approved" },
//   { accessorKey: "averageRating", header: "Average Rating" },
//   {
//   id: "edit",
//   header: "Edit Vehicle",
//   cell: ({ row }) => {
//     const vehicle = row.original

//     return (
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => {
//           dispatch(assignEditId(vehicle._id))
//           navigate("/owner/add-vehicle") 
//         }}
//       >
//         Edit
//       </Button>
//     )
//   },
// }
// ]

// export default function VehicleList() {
//     const { data } = useSelector((state) => {
//       return state.vehicle;
//     })
//     return(
//         <SidebarProvider>
//             <AppSidebar />
//             <main className="p-4">
//               <DataTable columns={columns} data={data} />
//             </main>
//         </SidebarProvider>
//     )
// } 


export default function VehicleList() {
  const { data } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const columns = [
  { accessorKey: "_id", header: "ID" },
  {
  accessorKey: "image",
  header: "Image",
  size: 220, 
  cell: ({ row }) => {
    const vehicle = row.original;
    return (
      <div className="w-[200px]">
        <img
          src={vehicle.image}
          alt="Vehicle"
          className="w-full h-24 object-cover rounded border"
        />
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
  accessorKey: "licenseVerified",
  header: "License",
  cell: ({ row }) => {
    const owner = row.original

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(owner.licenseDoc, "_blank")}
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
  {
  id: "edit",
  header: "Edit Vehicle",
  cell: ({ row }) => {
    const vehicle = row.original

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          dispatch(assignEditId(vehicle._id))
          navigate("/dashboard/owner/vehicles/add") 
        }}
      >
        Edit
      </Button>
    )
  },
}
]

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={data} />
      </main>
    </SidebarProvider>
  );
}