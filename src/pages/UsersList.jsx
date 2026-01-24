"use client"
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "../components/data-table-column-header";
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
      }
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
      }
    },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "role", header: "Role" }
]

export default function UsersList() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('/users', { headers: { Authorization: localStorage.getItem('token')}});
                setUsers(response.data);
            } catch(err) {
                console.log(err);
            }
          }
        fetchUsersList();
    }, [])

    if(!user) {
        return <p>loading...</p>
    }
    
    return(
        <SidebarProvider>
          <AppSidebar />
          <main className="p-4">
              <DataTable columns={columns} data={users} />
          </main>
        </SidebarProvider>
    )
}
