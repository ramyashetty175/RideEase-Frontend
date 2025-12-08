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
  { accessorKey: "vehicles", header: "No of Vehicles" }
]

export default function BookingList() {
    const { data } = useSelector((state) => {
      return state.booking;
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