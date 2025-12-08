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
import { DataTableColumnHeader } from "../../components/data-table-column-header";
import { useSelector } from "react-redux";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

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
  { accessorKey: "role", header: "Role" },
  { accessorKey: "license", header: "License" },
  { accessorKey: "action", header: "Action" }
]

async function getData() {
  // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ] 
}

export default function OwnerList() {
    const { data } = useSelector((state) => {
      return state.owner;
    })
    // const data = getData()

  return (
    // <div className="container mx-auto py-10">
    //   <DataTable columns={columns} data={data} />
    // </div>
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
       <DataTable columns={columns} data={data} />
      </main>
    </SidebarProvider>
  )
}