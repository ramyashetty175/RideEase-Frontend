"use client"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignEditId, vehicleApprove, vehicleReject } from "../slices/vehicleSlice";
import { useContext } from "react";
import UserContext from "@/context/UserContext";

export default function VehicleList({ status }) { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { data } = useSelector(state => state.vehicle);

    const filteredData = status ? data.filter(vehicle => vehicle.status === status) : data;

    const columns = [
        { accessorKey: "_id", header: "ID" },
        { accessorKey: "vehicleName", header: "Name" },
        { accessorKey: "registrationNumber", header: "Reg" },
        {
          header: "Owner",
          cell: ({ row }) => row.original.owner?.username
        },
        {
          header: "License",
          cell: ({ row }) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(row.original.licenseDoc, "_blank")}
            >
              View
            </Button>
          )
        },
        {
          header: "Insurance",
          cell: ({ row }) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(row.original.insuranceDoc, "_blank")}
            >
              View
            </Button>
          )
        },
        { accessorKey: "seats", header: "Seats" },
        { accessorKey: "pricePerDay", header: "Price" },
        { accessorKey: "availabilityStatus", header: "Availability" },
        { accessorKey: "status", header: "Status" },
    ]

    if (status === "pending") {
        columns.push({
          accessorKey: "action",
          header: "Action",
          cell: ({ row }) => {
          const vehicle = row.original
            return (
              <NativeSelect
                defaultValue="pending"
                className="h-9 w-32 text-sm"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "approved") {
                    dispatch(vehicleApprove({ editId: vehicle._id }))
                  }
                  if (value === "rejected") {
                    dispatch(vehicleReject({ editId: vehicle._id }))
                  }
                }}
              >
                <NativeSelectOption value="pending">Pending</NativeSelectOption>
                <NativeSelectOption value="approved">Approve</NativeSelectOption>
                <NativeSelectOption value="rejected">Reject</NativeSelectOption>
              </NativeSelect>
            )
          }
        })
    }

    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4">
          <DataTable columns={columns} data={filteredData} />
        </main>
      </SidebarProvider>
    )
}
