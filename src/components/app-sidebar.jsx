"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import { useContext } from "react"
import UserContext from "../context/UserContext";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMainAdmin: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Owners",
          url: "#",
        },
        {
          title: "Users",
          url: "#",
        },
        {
          title: "New Requests",
          url: "#",
        },
      ],
    },
    {
      title: "Bookings",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Bookings",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Approved",
          url: "#",
        },
        {
          title: "New Request",
          url: "#",
        },
        {
          title: "In-Progress",
          url: "#",
        },
        {
          title: "Rejected",
          url: "#",
        },
        {
          title: "Cancel Requested",
          url: "#",
        },
      ],
    },
    {
      title: "Vehilcles",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "All Vehicles",
          url: "#",
        },
        {
          title: "Add Vehicles",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Requested Vehicle",
          url: "#",
        },
        {
          title: "Approved Vehicle",
          url: "#",
        },
        {
          title: "Rejected Vehicle",
          url: "#",
        },
      ],
    },
  ],
  navMainOwner: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users",
          url: "#",
        },
        {
          title: "New Requests",
          url: "#",
        },
      ],
    },
    {
      title: "Bookings",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Bookings",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Approved",
          url: "#",
        },
        {
          title: "In-Progress",
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
        },
         {
          title: "Rejected",
          url: "#",
        },
        {
          title: "Cancel Requested",
          url: "#",
        },
      ],
    },
    {
      title: "Vehicles",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "All Vehicles",
          url: "#",
        },
        {
          title: "Add Vehicles",
          url: "#",
        },
      ],
    },
  ],
  navMainUser: [
    {
      title: "Profile",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Bookings",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Change Password",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Logout",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
  ]
}

export function AppSidebar(props) {
  const { user } = useContext(UserContext);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-4 py-2 font-bold text-lg">RideEase</div>
      </SidebarHeader>
      <SidebarContent>
        { user.role == 'admin' && <NavMain items={data.navMainAdmin} />}
        { user.role == 'owner' && <NavMain items={data.navMainOwner} />}
        { user.role == 'user' && <NavMain items={data.navMainUser} />}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        { (user.role == 'admin' || user.role == 'owner') && <NavUser user={data.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}