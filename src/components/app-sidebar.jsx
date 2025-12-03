import { LayoutDashboard, Calendar, Home, Inbox, Search, Settings, ChevronUp } from "lucide-react"

import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton >
           Manage Users
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">All Users</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Owners</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
         
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Users</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">New Requests</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton >
          Bookings
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">All Bookings</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Ongoing</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
         
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Completed</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Cancelled</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Rejected</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          </SidebarMenuSub>

      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton >
           Manage Vehicles
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">All Vehicles</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Approved</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
         
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Pending</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        
          <SidebarMenuSubItem >
            <SidebarMenuButton asChild>
              <Link to="/users">Rejected</Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
          </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {/* <User2 />*/} Username 
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  {/* <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}