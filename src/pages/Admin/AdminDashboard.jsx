// import AdminProfile from "./AdminProfile";
// import Vehicle from "../Vehicle";
// import Bookings from "../Bookings";
// import OwnerList from "./OwnerList";
// import UsersList from "../UsersList";
// import BookingCancel from "../BookingCancel";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}