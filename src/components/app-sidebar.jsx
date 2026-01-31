"use client";

import * as React from "react";
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

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { useContext } from "react";
import UserContext from "../context/UserContext";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

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
      url: "/dashboard/admin",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Users",
      url: "/dashboard/admin/users",
      icon: Bot,
      items: [
        {
          title: "All Users",
          url: "/dashboard/admin/users/all",
        },
        {
          title: "Users",
          url: "/dashboard/admin/users/user",
        },
        {
          title: "New Request",
          url: "/dashboard/admin/users/new-request",
        },
        {
          title: "Owners",
          url: "/dashboard/admin/users/owners/approve",
        },
        {
          title: "Reject Owner",
          url: "/dashboard/admin/users/owners/reject",
        },
      ],
    },
    {
      title: "Vehilcles",
      url: "/dashboard/admin/vehicles",
      icon: Settings2,
      items: [
        {
          title: "All Vehicles",
          url: "/dashboard/admin/vehicles/all",
        },
        {
          title: "New Request",
          url: "/dashboard/admin/vehicles/new-request",
        },
        {
          title: "Approve",
          url: "/dashboard/admin/vehicles/approve",
        },
        {
          title: "Reject",
          url: "/dashboard/admin/vehicles/reject",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/dashboard/admin/bookings",
      icon: BookOpen,
      items: [
        {
          title: "All Bookings",
          url: "/dashboard/admin/bookings/all",
        },
        {
          title: "New Request",
          url: "/dashboard/admin/bookings/new-request",
        },
        {
          title: "Approve",
          url: "/dashboard/admin/bookings/approve",
        },
        {
          title: "Cancel",
          url: "/dashboard/admin/bookings/cancel",
        },
      ],
    },
    {
      title: "Vehicle Map",
      url: "/dashboard/admin/vehicle/tracking",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
  navMainOwner: [
    {
      title: "Dashboard",
      url: "/dashboard/owner",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Vehicles",
      url: "/dashboard/owner/vehicles",
      icon: Settings2,
      items: [
        {
          title: "All Vehicles",
          url: "/dashboard/owner/vehicles/all",
        },
        {
          title: "Add Vehicles",
          url: "/dashboard/owner/vehicles/add",
        },
      ],
    },
    {
      title: "Bookings",
      url: "/dashboard/owner/bookings",
      icon: BookOpen,
      items: [
        {
          title: "All Bookings",
          url: "/dashboard/owner/bookings/all",
        },
        {
          title: "New Request",
          url: "/dashboard/owner/bookings/new-request",
        },
        {
          title: "Approve",
          url: "/dashboard/owner/bookings/approve",
        },
         {
          title: "Cancel",
          url: "/dashboard/owner/bookings/cancel",
        },
      ],
    },
  ],
  navMainUser: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Change Password",
      url: "/dashboard/change-password",
      icon: SquareTerminal,
      isActive: true,
    },
     {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: SquareTerminal,
      isActive: true,
    }
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
      </SidebarContent>
      <SidebarFooter>
        { (user.role == 'admin' || user.role == 'owner') && <NavUser user={data.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}