"use client"
import { ArrowUpDown } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function Users() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('/users/listUsers', { headers: { Authorization: localStorage.getItem('token')}});
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
    
    // const handleRemove = async (id, email) => {
    //     const userConfirm = window.confirm("Are you sure?");
    //     if(userConfirm) {
    //         const userEmail = window.prompt("Enter email of your user");
    //         if(userEmail == email) {
    //             try {
    //                 const response = await axios.delete(`/users/profile/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
    //                 const newArr = users.filter(ele => ele._id != response.data._id);
    //                 setUsers(newArr);
    //             } catch(err) {
    //                 console.log(err);
    //             }
    //         } else {
    //             alert("Email is incorrect");
    //         }
    //     }
    // }
    
    const columns = [
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
      { accessorKey: "role", header: "Role" },
      // {
      //   accessorKey: "licenceVerified",
      //   header: "License",
      //   cell: ({ row }) => {
      //     const owner = row.original;
      //       return (
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           onClick={() => window.open(owner.licenceDoc, "_blank")}
      //         >
      //           View
      //         </Button>
      //       )
      //   }
      // },
      // {
      //   accessorKey: "insuranceVerified",
      //   header: "Insurance",
      //   cell: ({ row }) => {
      //     const owner = row.original
      //       return (
      //         <Button
      //           variant="outline"
      //           size="sm"
      //           onClick={() => window.open(owner.insuranceDoc, "_blank")}
      //         >
      //           View
      //         </Button>
      //       )
      //   }
      // },
      // {
      //   id: "action",
      //   header: "Action",
      //   cell: ({ row }) => {
      //     const user = row.original;
      //       return (
      //         <Button
      //           variant="destructive"
      //           size="sm"
      //           onClick={() => {
      //           if (confirm("Remove this user?")) {
      //             handleRemove(user._id);
      //           }
      //         }}
      //         >
      //           Remove
      //         </Button>
      //       )
      //   }
      // }
    ]
   
    return(
        <SidebarProvider>
          <AppSidebar />
          <main className="p-4">
              <DataTable columns={columns} data={users} />
          </main>
        </SidebarProvider>
    )
}
