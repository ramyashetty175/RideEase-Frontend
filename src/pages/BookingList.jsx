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
import { bookingApprove, bookingCancel } from "../slices/bookingSlice";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { useState } from "react";

export default function BookingList({ status }) {
    const { data } = useSelector((state) => {
      return state.booking;
    })

  const dispatch = useDispatch();

  const [actionValue, setActionValue] = useState({});

  const filteredData = (() => {
  if (status === "newRequest") {
    return data.filter((owner) => owner.status === "pending");
  }
  if (status === "approved") {
    return data.filter((owner) => owner.status === "approved");
  }
  if (status === "confirmed") {
    return data.filter((owner) => owner.status === "confirmed");
  }
  if (status === "in-progress") {
    return data.filter((owner) => owner.status === "in-progress");
  }
  if (status === "completed") {
    return data.filter((owner) => owner.status === "completed");
  }
  if (status === "canceled") {
    return data.filter((owner) => owner.status === "canceled");
  }
  if (status === "cancelRequested") {
    return data.filter((owner) => owner.status === "cancelRequested");
  }
  return data;
})();

    const columns = [
  { accessorKey: "_id", header: "Booking ID" },
  {
    accessorKey: "username",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Name" />
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Email" />
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  { accessorKey: "vehicles", header: "Vehicle ID" },
  { accessorKey: "vehicles", header: "Vehicle Name" },
  { accessorKey: "vehicles", header: "Owner ID" },
  { accessorKey: "vehicles", header: "Owner Name" },
  { accessorKey: "vehicles", header: "Pickup Location" },
  { accessorKey: "vehicles", header: "Return Location" },
  { accessorKey: "vehicles", header: "Total Amount" },
  { accessorKey: "vehicles", header: "Payment Status" },
  { accessorKey: "vehicles", header: "Booking Status" },
  { accessorKey: "vehicles", header: "TripStartTime" },
  { accessorKey: "vehicles", header: "TripEndTime" }
]

  if (status === "newRequest") {
    columns.push({
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const booking = row.original
        return (
        <NativeSelect
  value={actionValue[booking._id] || booking.status}
  onChange={(e) => {
    const value = e.target.value;

    setActionValue((prev) => ({
      ...prev,
      [booking._id]: value,
    }));

    if (value === "approved") {
      dispatch(
        bookingApprove({
          editId: booking._id,
          formData: {
            licenceDoc: owner.licenceDoc,
            insuranceDoc: owner.insuranceDoc,
          },
        })
      );
    }

    if (value === "canceled") {
      dispatch(
        bookingCancel({
          editId: booking._id,
          formData: { reason: "Canceled by admin" },
        })
      );
    }
  }}
>
            <NativeSelectOption value="pending">Pending</NativeSelectOption>
            <NativeSelectOption value="approved">Approve</NativeSelectOption>
            <NativeSelectOption value="canceled">Cancel</NativeSelectOption>
          </NativeSelect>
        )
      },
    })
  }

    return(
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4">
              <DataTable columns={columns} data={filteredData} />
            </main>
        </SidebarProvider>
    )
}