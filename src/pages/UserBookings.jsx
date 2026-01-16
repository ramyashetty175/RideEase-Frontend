"use client"

import { useSelector, useDispatch } from "react-redux";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { bookingStartTrip, bookingEndTrip, bookingExtendTrip } from "../slices/bookingSlice";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function UserBookings() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.booking);

  const columns = [
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
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const booking = row.original;
        if (!["approved", "in-progress"].includes(booking.bookingStatus)) return null;

        return (
          <NativeSelect
            defaultValue=""
            onChange={(e) => {
  const action = e.target.value;
  if (action === "start") {
    dispatch(
      bookingStartTrip({
        editId: booking._id,
        formData: {} 
      })
    );
  }

  if (action === "end") {
    dispatch(
      bookingEndTrip({
        editId: booking._id,
        formData: {}
      })
    );
  }

  if (action === "extend") {
    dispatch(
      bookingExtendTrip({
        editId: booking._id,
        formData: {}
      })
    );
  }

  e.target.value = "";
}}
            className="w-36"
          >
            <NativeSelectOption value="" disabled>
              Select Action
            </NativeSelectOption>
            <NativeSelectOption value="start">Start Trip</NativeSelectOption>
            <NativeSelectOption value="end">End Trip</NativeSelectOption>
            <NativeSelectOption value="extend">Extend Trip</NativeSelectOption>
          </NativeSelect>
        );
      },
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={data} />
      </main>
    </SidebarProvider>
  );
}