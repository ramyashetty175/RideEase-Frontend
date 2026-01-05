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
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { useState } from "react";

export const columns = [
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

export default function BookingList({ status }) {
    const { data } = useSelector((state) => {
      return state.booking;
    })

  const dispatch = useDispatch();

  const [actionValue, setActionValue] = useState({});

  const filteredData = (() => {
  if (type === "newRequest") {
    return data.filter((owner) => owner.status === "pending");
  }
  if (type === "approved") {
    return data.filter((owner) => owner.status === "approved");
  }
  if (type === "confirmed") {
    return data.filter((owner) => owner.status === "confirmed");
  }
  if (type === "in-progress") {
    return data.filter((owner) => owner.status === "in-progress");
  }
  if (type === "completed") {
    return data.filter((owner) => owner.status === "completed");
  }
  if (type === "canceled") {
    return data.filter((owner) => owner.status === "canceled");
  }
  if (type === "cancelRequested") {
    return data.filter((owner) => owner.status === "cancelRequested");
  }
  return data;
})();

    return(
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4">
              <DataTable columns={columns} data={data} />
            </main>
        </SidebarProvider>
    )
}