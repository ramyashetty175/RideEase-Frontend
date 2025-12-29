// "use client"

// import { MoreHorizontal } from "lucide-react";
// import { ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { DataTableColumnHeader } from "../../components/data-table-column-header";
// import { useSelector } from "react-redux";
// import { DataTable } from "@/components/data-table";
// import { SidebarProvider } from "../../components/ui/sidebar";
// import { AppSidebar } from "../../components/app-sidebar";

// export const columns = [
//   { accessorKey: "_id", header: "ID" },
//   {
//     accessorKey: "username",
//     header: ({ column }) => {
//       <DataTableColumnHeader column={column} title="Name" />
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       <DataTableColumnHeader column={column} title="Email" />
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   { accessorKey: "role", header: "Role" },
//   { accessorKey: "license", header: "License" },
//   { accessorKey: "insurance", header: "Insurance" }
// ]

// async function getData() {
//   // Fetch data from your API here.
// //   return [
// //     {
// //       id: "728ed52f",
// //       amount: 100,
// //       status: "pending",
// //       email: "m@example.com",
// //     },
// //     // ...
// //   ] 
// }

// export default function OwnerList() {
//     const { data } = useSelector((state) => {
//         return state.owner;
//     })
//     // const data = getData()

//   return (
//     // <div className="container mx-auto py-10">
//     //   <DataTable columns={columns} data={data} />
//     // </div>
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="p-4">
//        <DataTable columns={columns} data={data} />
//       </main>
//     </SidebarProvider>
//   )
// }


// "use client"

// import {
//   NativeSelect,
//   NativeSelectOption,
// } from "@/components/ui/native-select"


// import { ArrowUpDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DataTable } from "@/components/data-table"
// import { SidebarProvider } from "../../components/ui/sidebar"
// import { AppSidebar } from "../../components/app-sidebar"
// import { useSelector, useDispatch } from "react-redux"
// import { OwnerApprove } from "../../slices/ownerSlice"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export default function OwnerList({ type }) {
//   const dispatch = useDispatch()
//   const { data } = useSelector((state) => state.owner)

//   // 🔹 Filter data
//   const filteredData =
//     type === "newRequest"
//       ? data.filter((owner) => owner.isApproved === false)
//       : data.filter((owner) => owner.isApproved === true)

//   // 🔹 Base columns
//   const columns = [
//     { accessorKey: "_id", header: "ID" },
//     {
//       accessorKey: "username",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       ),
//     },
//     { accessorKey: "email", header: "Email" },
//     { accessorKey: "role", header: "Role" },
//     { accessorKey: "licenceVerified", header: "License" },
//     { accessorKey: "insuranceVerified", header: "Insurance" },
//   ]

//   // 🔹 Action column ONLY for New Requests
//   if (type === "newRequest") {
//     columns.push({
//       id: "action",
//       header: "Action",
//       cell: ({ row }) => {
//         const owner = row.original

//         return (
         
//             <NativeSelect
//             defaultValue="pending"
//             onChange={(e) => {
//               const value = e.target.value

//               if (value === "approve") {
//                 dispatch(
//                   OwnerApprove({
//                     editId: owner._id,
//                     formData: {
//                       licenceDoc: owner.licenceDoc,
//                       insuranceDoc: owner.insuranceDoc,
//                     },
//                   })
//                 )
//               }
//               if (value === "reject") {
//                 alert("Reject API pending")
//               }
//             }}
//           >
//             <NativeSelectOption value="pending">
//               Pending
//             </NativeSelectOption>

//             <NativeSelectOption value="approve">
//               Approve
//             </NativeSelectOption>

//             <NativeSelectOption value="reject">
//               Reject
//             </NativeSelectOption>
//           </NativeSelect>
//         )
//       },
//     })
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="p-4">
//         <DataTable columns={columns} data={filteredData} />
//       </main>
//     </SidebarProvider>
//   )
// }

"use client"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/app-sidebar"
import { useSelector, useDispatch } from "react-redux"
import { OwnerApprove } from "../../slices/ownerSlice"
import { useState } from "react"

export default function OwnerList({ type }) {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.owner)

  const [actionValue, setActionValue] = useState({});

  // Filter data
  const filteredData =
    type === "newRequest"
      ? data.filter((owner) => owner.isApproved === false)
      : data.filter((owner) => owner.isApproved === true)

  // Columns
  const columns = [
    { accessorKey: "_id", header: "ID" },
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
      ),
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
        onClick={() => window.open(owner.licenceDoc, "_blank")}
      >
        View
      </Button>
    )
  },
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
        onClick={() => window.open(owner.insuranceDoc, "_blank")}
      >
        View
      </Button>
    )
  },
},


  ]

  // Action column for new requests
  if (type === "newRequest") {
    columns.push({
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const owner = row.original

        return (
          
              <NativeSelect
  value={actionValue[owner._id] || "pending"}
  onChange={(e) => {
    const value = e.target.value;

    setActionValue((prev) => ({
      ...prev,
      [owner._id]: value,
    }));

    if (value === "approve") {
      dispatch(
        OwnerApprove({
          editId: owner._id,
          formData: {
            licenceDoc: owner.licenceDoc,
            insuranceDoc: owner.insuranceDoc,
          },
        })
      );
    }

    if (value === "reject") {
      dispatch(
        OwnerReject({
          editId: owner._id,
          formData: { reason: "Rejected by admin" },
        })
      );
    }
  }}
>

            <NativeSelectOption value="pending">Pending</NativeSelectOption>
            <NativeSelectOption value="approve">Approve</NativeSelectOption>
            <NativeSelectOption value="reject">Reject</NativeSelectOption>
          </NativeSelect>
        )
      },
    })
  }
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
    },
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