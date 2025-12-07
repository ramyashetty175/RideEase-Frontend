// import { useSelector } from "react-redux";

// export default function OwnerList() {
//     const { data } = useSelector((state) => {
//         return state.owner;
//     })

//     return(
//         <table>
//             <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 { data.map((ele, i) => {
//                     return(
//                         <tr key={ele._id}>
//                             <td>{ i+1 }</td>
//                             <td>{ ele.name }</td>
//                             <td>{ ele.email }</td>
//                             <td>{ ele.phone }</td>
//                             <td></td>
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </table>
//     )
// }


// <DataTable columns={columns} data={data} />




"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]




import { DataTable } from "./data-table"

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}