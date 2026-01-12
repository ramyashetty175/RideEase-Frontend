"use client"

import { ArrowUpDown } from "lucide-react";
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
    { accessorKey: "email", header: "Email" },
    { accessorKey: "vehicleName", header: "Vehicle" },
    { accessorKey: "ownerName", header: "Owner" },
    { accessorKey: "pickupLocation", header: "Pickup" },
    { accessorKey: "returnLocation", header: "Return" },
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
                    dispatch(
                      bookingApprove({
                        editId: booking._id,
                      })
                    );
                  }

                  if (value === "canceled") {
                    dispatch(
                      bookingCancel({
                        editId: booking._id,
                        formData: { reason: "Canceled by admin" },
                      })
                    );
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
