// "use client"

// import { ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
// import { bookingApprove, bookingCancel } from "../slices/bookingSlice";
// import { DataTable } from "@/components/data-table";
// import { SidebarProvider } from "../components/ui/sidebar";
// import { AppSidebar } from "../components/app-sidebar";

// export default function BookingList({ status }) {
//   const dispatch = useDispatch();
//   const { data } = useSelector((state) => state.booking);
  
//   const filteredData = status
//     ? data.filter((b) => b.bookingStatus === status)
//     : data;

//   const baseColumns = [
//     { accessorKey: "_id", header: "Booking ID" },
//     { accessorKey: "userName", header: "User Name" },
//     { accessorKey: "vehicleName", header: "Vehicle" },
//     { accessorKey: "pickupLocation", header: "Pickup" },
//     { accessorKey: "returnLocation", header: "Return" },
//     { accessorKey: "pickupLocation", header: "Licence" },
//     { accessorKey: "returnLocation", header: "Insurance" },
//     { accessorKey: "totalAmount", header: "Amount" },
//     { accessorKey: "paymentStatus", header: "Payment" },
//     { accessorKey: "bookingStatus", header: "Status" },
//   ];
  
//   const actionColumn =
//   status === "pending"
//     ? [
//         {
//           id: "action",
//           header: "Action",
//           cell: ({ row }) => {
//             const booking = row.original;

//             return (
//               <NativeSelect
//                 value={booking.bookingStatus}
//                 onChange={(e) => {
//                   const value = e.target.value;

//                   if (value === "approved") {
//                     dispatch(
//                       bookingApprove({
//                         editId: booking._id
//                       })
//                     );
//                   }

//                   if (value === "canceled") {
//                     dispatch(
//                       bookingCancel({
//                         editId: booking._id
//                       })
//                     );
//                   }
//                 }}
//                 className="w-32"
//               >
//                 <NativeSelectOption value="pending">
//                   Pending
//                 </NativeSelectOption>

//                 <NativeSelectOption value="approved">
//                   Approve
//                 </NativeSelectOption>

//                 <NativeSelectOption value="canceled">
//                   Cancel
//                 </NativeSelectOption>
//               </NativeSelect>
//             );
//           },
//         },
//       ]
//     : status === "in-progress"
//     ? [
//         {
//           id: "action",
//           header: "Action",
//           cell: ({ row }) => {
//             const booking = row.original;

//             return (
//               <Button
//   size="sm"
//   onClick={() => {
//     // Navigate to VehicleTracking page
//     window.location.href = `/vehicle-tracking/${booking.vehicle}`;
//   }}
// >
//   Track
// </Button>
//             );
//           },
//         },
//       ]
//     : [];

//   const columns = [...baseColumns, ...actionColumn];

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="p-4">
//         <DataTable columns={columns} data={filteredData} />
//       </main>
//     </SidebarProvider>
//   );
// }


"use client"

import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { bookingApprove, bookingCancel } from "../slices/bookingSlice";
import { approveBookingCancel, rejectBookingCancel } from "../slices/bookingCancellationSlice";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function BookingList({ status }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);

  const filteredData = status
    ? data.filter((b) => b.bookingStatus === status)
    : data;

  const baseColumns = [
    { accessorKey: "_id", header: "Booking ID" },
    { accessorKey: "userName", header: "User Name" },
    { accessorKey: "vehicleName", header: "Vehicle" },
    { accessorKey: "pickupLocation", header: "Pickup" },
    { accessorKey: "returnLocation", header: "Return" },
    { accessorKey: "totalAmount", header: "Amount" },
    { accessorKey: "paymentStatus", header: "Payment" },
    { accessorKey: "bookingStatus", header: "Status" },
  ];

  // Only push License, Insurance, and Action columns if status is "pending"
  const columns =
    status === "pending"
      ? [
          ...baseColumns,
          {
            header: "License",
            cell: ({ row }) => {
              const booking = row.original;
              return booking.user?.licenceDoc ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(booking.user.licenceDoc, "_blank")}
                >
                  View
                </Button>
              ) : null;
            },
          },
          {
            header: "Insurance",
            cell: ({ row }) => {
              const booking = row.original;
              return booking.user?.insuranceDoc ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(booking.user.insuranceDoc, "_blank")}
                >
                  View
                </Button>
              ) : null;
            },
          },
          {
            id: "action",
            header: "Action",
            cell: ({ row }) => {
              const booking = row.original;

              return (
                <NativeSelect
                  value={booking.bookingStatus}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "approved") {
                      dispatch(bookingApprove({ editId: booking._id }));
                    }

                    if (value === "canceled") {
                      dispatch(bookingCancel({ editId: booking._id }));
                    }
                  }}
                  className="w-32"
                >
                  <NativeSelectOption value="pending">Pending</NativeSelectOption>
                  <NativeSelectOption value="approved">Approve</NativeSelectOption>
                  <NativeSelectOption value="canceled">Cancel</NativeSelectOption>
                </NativeSelect>
              );
            },
          },
        ]
      : status === "cancelRequested"
    ? [
        ...baseColumns,
        {
          id: "action",
          header: "Action",
          cell: ({ row }) => {
            const booking = row.original;
            return (
              <NativeSelect
                value="pending"
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "approved") {
                    dispatch(approveBookingCancel({ id: booking._id }));
                  }
                  if (value === "rejected") {
                    dispatch(rejectBookingCancel({ id: booking._id }));
                  }
                }}
                className="w-32"
              >
                <NativeSelectOption value="pending">Pending</NativeSelectOption>
                <NativeSelectOption value="approved">Approve</NativeSelectOption>
                <NativeSelectOption value="rejected">Reject</NativeSelectOption>
              </NativeSelect>
            );
          },
        },
      ]
    : baseColumns;


  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={filteredData} />
      </main>
    </SidebarProvider>
  );
}
