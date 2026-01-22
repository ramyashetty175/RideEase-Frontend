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

    // ✅ Licence View Button
    {
      header: "Licence",
      cell: ({ row }) => {
        const booking = row.original;
        const licence = booking.user?.licenceDoc;

        return (
          <Button
            variant="outline"
            size="sm"
            disabled={!licence}
            onClick={() => window.open(licence, "_blank")}
          >
            {licence ? "View" : "Not Uploaded"}
          </Button>
        );
      },
    },

    // ✅ Insurance View Button
    {
      header: "Insurance",
      cell: ({ row }) => {
        const booking = row.original;
        const insurance = booking.user?.insuranceDoc;

        return (
          <Button
            variant="outline"
            size="sm"
            disabled={!insurance}
            onClick={() => window.open(insurance, "_blank")}
          >
            {insurance ? "View" : "Not Uploaded"}
          </Button>
        );
      },
    },

    { accessorKey: "totalAmount", header: "Amount" },
    { accessorKey: "paymentStatus", header: "Payment" },
    { accessorKey: "bookingStatus", header: "Status" },
  ];

  const actionColumn =
    status === "pending"
      ? [
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
                  <NativeSelectOption value="pending">
                    Pending
                  </NativeSelectOption>
                  <NativeSelectOption value="approved">
                    Approve
                  </NativeSelectOption>
                  <NativeSelectOption value="canceled">
                    Cancel
                  </NativeSelectOption>
                </NativeSelect>
              );
            },
          },
        ]
      : status === "in-progress"
      ? [
          {
            id: "action",
            header: "Action",
            cell: ({ row }) => {
              const booking = row.original;

              return (
                <Button
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/vehicle-tracking/${booking.vehicle}`)
                  }
                >
                  Track
                </Button>
              );
            },
          },
        ]
      : [];

  const columns = [...baseColumns, ...actionColumn];

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={filteredData} />
      </main>
    </SidebarProvider>
  );
}