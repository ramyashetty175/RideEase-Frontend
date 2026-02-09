"use client";
import { useSelector } from "react-redux";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function UserBookings() {
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
      { accessorKey: "bookingStatus", header: "Status" }
    ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4">
        <DataTable columns={columns} data={data} />
      </main>
    </SidebarProvider>
  );
}