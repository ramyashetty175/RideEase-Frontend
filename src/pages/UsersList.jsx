import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";

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
  { accessorKey: "role", header: "Role" },
  { accessorKey: "license", header: "License" },
  { accessorKey: "action", header: "Action" }
]

export default function Users() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('/users', { headers: { Authorization: localStorage.getItem('token') } })
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
    
        const handleRemove = async (id, email) => {
            const userConfirm = window.confirm("Are you sure?");
            if(userConfirm) {
                const userEmail = window.prompt("Enter email of your user");
                if(userEmail == email) {
                   try {
                    const response = await axios.delete(`/users/${id}`, { headers: { Authorization: localStorage.getItem('token')}})
                    const newArr = users.filter(ele => ele._id != response.data._id);
                    setUsers(newArr);
                } catch(err) {
                    console.log(err);
                }
                } else {
                    alert("Email is incorrect");
                }
            }
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
