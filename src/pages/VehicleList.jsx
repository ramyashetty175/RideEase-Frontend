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
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { assignEditId, vehicleApprove, vehicleReject } from "../slices/vehicleSlice";
import { useState } from "react";

export default function VehicleList({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.vehicle);

  const [actionValue, setActionValue] = useState({});

  const filteredData = (() => {
  if (type === "newRequest") {
    return data.filter(vehicle => vehicle.status === "pending");
  }
  if (type === "approved") {
    return data.filter(vehicle => vehicle.status === "approved");
  }
  if (type === "rejected") {
    return data.filter(vehicle => vehicle.status === "rejected");
  }
  return data;
})();


  const columns = [
    { accessorKey: "_id", header: "ID" },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <img
            src={vehicle.image}
            alt="Vehicle"
            className="w-40 h-24 object-cover rounded border"
          />
        );
      },
    },
    { accessorKey: "vehicleName", header: "Vehicle Name" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "brand", header: "Brand" },
    { accessorKey: "registrationNumber", header: "Registration Number" },
    { accessorKey: "owner", header: "Owner" },

    {
      header: "License",
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(vehicle.licenseDoc, "_blank")}
          >
            View
          </Button>
        );
      },
    },
    {
      header: "Insurance",
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(vehicle.insuranceDoc, "_blank")}
          >
            View
          </Button>
        );
      },
    },

    { accessorKey: "fuelType", header: "Fuel Type" },
    { accessorKey: "transmission", header: "Transmission" },
    { accessorKey: "seats", header: "Seats" },
    { accessorKey: "pricePerDay", header: "Price Per Day" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "availabilityStatus", header: "Availability Status" },
    { accessorKey: "status", header: "Status" },
    {
      id: "edit",
      header: "Edit Vehicle",
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              dispatch(assignEditId(vehicle._id));
              navigate(`/dashboard/owner/vehicles/add/${vehicle._id}`);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  
  if (type === "newRequest") {
     columns.push({
  id: "action",
  header: "Action",
  cell: ({ row }) => {
    const vehicle = row.original;
    const currentValue =
      actionValue[vehicle._id] ||
      (vehicle.status === "pending"
        ? "pending"
        : vehicle.status === "approved"
        ? "approved"
        : "rejected");

    return (
      <NativeSelect
        value={currentValue}
        disabled={vehicle.status !== "pending"}
        className="h-9 w-32 text-sm"
        onChange={(e) => {
          const value = e.target.value;

          setActionValue((prev) => ({ ...prev, [vehicle._id]: value }));

          if (value === "approved") {
            dispatch(
              vehicleApprove({
                editId: vehicle._id,
                formData: { status: "approved" },
              })
            );
          }
          if (value === "rejected") {
            dispatch(
              vehicleReject({
                editId: vehicle._id,
                formData: { status: "rejected" },
              })
            );
          }
        }}
      >
        <NativeSelectOption value="pending">Pending</NativeSelectOption>
        <NativeSelectOption value="approved">Approve</NativeSelectOption>
        <NativeSelectOption value="rejected">Reject</NativeSelectOption>
      </NativeSelect>
    );
  },
});
}

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={filteredData} />
      </main>
    </SidebarProvider>
  );
}