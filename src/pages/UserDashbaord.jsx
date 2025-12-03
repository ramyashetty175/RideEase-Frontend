import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

export default function UserDashboard() {
  return (
    <SidebarProvider>
      <NavUser />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}