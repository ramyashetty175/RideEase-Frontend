// "use client"

// import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
// import { ArrowUpDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DataTable } from "@/components/data-table"
// import { SidebarProvider } from "../../components/ui/sidebar"
// import { AppSidebar } from "../../components/app-sidebar"
// import { useSelector, useDispatch } from "react-redux"
// import { OwnerApprove, OwnerReject, removeOwner } from "../../slices/ownerSlice"
// import { useState } from "react";

// export default function OwnerList({ type }) {
//     const dispatch = useDispatch();
//     const { data } = useSelector((state) => state.owner)

//     const [actionValue, setActionValue] = useState({});

//     const filteredData = (() => {
//   if (type === "newRequest") {
//     return data.filter(owner => owner.status === "pending")
//   } else if (type === "approved") {
//     return data.filter(owner => owner.status === "approved")
//   } else if (type === "rejected") {
//     return data.filter(owner => owner.status === "rejected")
//   }
//   return data
// })()


//     const columns = [  
//         {
//             accessorKey: "username",
//             header: ({ column }) => (
//             <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             >
//               Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//             )
//         },
//         { accessorKey: "email", header: "Email" },
//         { accessorKey: "role", header: "Role" },
//         {
//             accessorKey: "licenceVerified",
//             header: "License",
//             cell: ({ row }) => {
//                 const owner = row.original
//                     return (
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => window.open(owner.licenceDoc, "_blank")}
//                         >
//                           View
//                         </Button>
//                     )
//             }
//         },

//         {
//             accessorKey: "insuranceVerified",
//             header: "Insurance",
//             cell: ({ row }) => {
//             const owner = row.original
//                 return (
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => window.open(owner.insuranceDoc, "_blank")}
//                     >
//                         View
//                     </Button>
//                 )
//             }
//         },
//         { accessorKey: "status", header: "Status" }
//     ]

//     if (type === "newRequest") {
//         columns.push({
//             id: "action",
//             header: "Action",
//             cell: ({ row }) => {
//                 const owner = row.original
//                     return (
//                         <NativeSelect
//                             value={actionValue[owner._id] || owner.status}
//                             onChange={(e) => {
//                             const value = e.target.value;
//                             setActionValue((prev) => ({ ...prev, [owner._id]: value }));
//                             if (value === "approved") {
//                                 dispatch( OwnerApprove({ editId: owner._id, formData: { licenceDoc: owner.licenceDoc, insuranceDoc: owner.insuranceDoc }}));
//                             }
//                             if (value === "rejected") { 
//                                 dispatch( OwnerReject({ editId: owner._id, formData: { reason: "Rejected by admin" }}));
//                             }
//                             }}
//                         >
//                             <NativeSelectOption value="pending">Pending</NativeSelectOption>
//                             <NativeSelectOption value="approved">Approve</NativeSelectOption>
//                             <NativeSelectOption value="rejected">Reject</NativeSelectOption>
//                         </NativeSelect>
//                     )          
//             }
//         })
//     }
  
//     if (type !== "newRequest") {
//         columns.push({
//         id: "remove",
//         header: "Action",
//         cell: ({ row }) => {
//             const owner = row.original
//                 return (
//                     <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => {
//                             if (confirm("Are you sure you want to remove this owner?")) {
//                                 dispatch(removeOwner(owner._id));
//                             }
//                         }}
//                     >
//                       Remove
//                     </Button>
//                 )
//             }
//         })
//     }

//     return (
//         <SidebarProvider>
//         <AppSidebar />
//         <main className="p-4">
//             <DataTable columns={columns} data={filteredData} />
//         </main>
//         </SidebarProvider>
//     )
// }



"use client"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"
import { useSelector, useDispatch } from "react-redux"
import { OwnerApprove, OwnerReject, removeOwner } from "../../slices/ownerSlice"
import { useState } from "react"

export default function OwnerList({ type }) {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.owner)

    // Local state to reflect instant action
    const [actionValue, setActionValue] = useState({})

    // Filter data using actionValue to instantly move approved/rejected users
    const filteredData = data.filter(owner => {
        const status = actionValue[owner._id] || owner.status
        if (type === "newRequest") return status === "pending"
        if (type === "approved") return status === "approved"
        if (type === "rejected") return status === "rejected"
        return true
    })

    const columns = [
        {
            accessorKey: "username",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        {
            accessorKey: "licenceVerified",
            header: "License",
            cell: ({ row }) => {
                const owner = row.original
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => owner.licenceDoc && window.open(owner.licenceDoc, "_blank")}
                    >
                        View
                    </Button>
                )
            }
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
                        onClick={() => owner.insuranceDoc && window.open(owner.insuranceDoc, "_blank")}
                    >
                        View
                    </Button>
                )
            }
        },
        { accessorKey: "status", header: "Status" }
    ]

    // Add Approve/Reject dropdown only for newRequest
    if (type === "newRequest") {
        columns.push({
            id: "action",
            header: "Action",
            cell: ({ row }) => {
                const owner = row.original
                const currentValue = actionValue[owner._id] || owner.status

                return (
                    <NativeSelect
                        value={currentValue}
                        className="h-9 w-32 text-sm"
                        onChange={(e) => {
                            const value = e.target.value

                            // Update local state instantly
                            setActionValue(prev => ({ ...prev, [owner._id]: value }))

                            // Dispatch API calls
                            if (value === "approved") {
                                dispatch(OwnerApprove({ editId: owner._id }))
                            }
                            if (value === "rejected") {
                                dispatch(OwnerReject({ editId: owner._id }))
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

    // Add Remove button for approved/rejected
    if (type !== "newRequest") {
        columns.push({
            id: "remove",
            header: "Action",
            cell: ({ row }) => {
                const owner = row.original
                return (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure you want to remove this owner?")) {
                                dispatch(removeOwner(owner._id))
                            }
                        }}
                    >
                        Remove
                    </Button>
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