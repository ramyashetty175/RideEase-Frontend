// import Bookings from "../Bookings";
// import UsersList from "../UsersList";
// import OwnerMain from "./OwnerMain";
// import BookingCancel from "../BookingCancel";
// import Vehicle from "../Vehicle";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function OwnerDashboard() {
  return (
    <SidebarProvider>
        <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}