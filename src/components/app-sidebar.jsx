// import { LayoutDashboard, Calendar, Home, Inbox, Search, Settings, ChevronUp } from "lucide-react"

// import { Link } from "react-router-dom";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuSub,
//   SidebarMenuSubItem,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter
// } from "@/components/ui/sidebar"

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//   <Collapsible defaultOpen className="group/collapsible">
//     <SidebarMenuItem>
//       <CollapsibleTrigger asChild>
//         <SidebarMenuButton >
//            Manage Users
//         </SidebarMenuButton>
//       </CollapsibleTrigger>
//       <CollapsibleContent>
//         <SidebarMenuSub>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">All Users</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Owners</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
         
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Users</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
        
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">New Requests</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           </SidebarMenuSub>
//       </CollapsibleContent>
//     </SidebarMenuItem>
//   </Collapsible>
//   <Collapsible defaultOpen className="group/collapsible">
//     <SidebarMenuItem>
//       <CollapsibleTrigger asChild>
//         <SidebarMenuButton >
//           Bookings
//         </SidebarMenuButton>
//       </CollapsibleTrigger>
//       <CollapsibleContent>
//         <SidebarMenuSub>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">All Bookings</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Ongoing</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
         
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Completed</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
        
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Cancelled</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Rejected</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           </SidebarMenuSub>

//       </CollapsibleContent>
//     </SidebarMenuItem>
//   </Collapsible>
//   <Collapsible defaultOpen className="group/collapsible">
//     <SidebarMenuItem>
//       <CollapsibleTrigger asChild>
//         <SidebarMenuButton >
//            Manage Vehicles
//         </SidebarMenuButton>
//       </CollapsibleTrigger>
//       <CollapsibleContent>
//         <SidebarMenuSub>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">All Vehicles</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Approved</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
         
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Pending</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
        
//           <SidebarMenuSubItem >
//             <SidebarMenuButton asChild>
//               <Link to="/users">Rejected</Link>
//             </SidebarMenuButton>
//           </SidebarMenuSubItem>
//           </SidebarMenuSub>
//       </CollapsibleContent>
//     </SidebarMenuItem>
//   </Collapsible>
// </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <SidebarMenuButton>
//                     {/* <User2 />*/} Username 
//                     <ChevronUp className="ml-auto" />
//                   </SidebarMenuButton>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   side="top"
//                   className="w-[--radix-popper-anchor-width]"
//                 >
//                   {/* <DropdownMenuItem>
//                     <span>Profile</span>
//                   </DropdownMenuItem> */}
//                   <DropdownMenuItem asChild>
//           <Link to="/profile">Profile</Link>
//         </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <span>Billing</span>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <span>Sign out</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarFooter>
//     </Sidebar>
//   )
// }

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
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-4 py-2 font-bold text-lg">RideEase</div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
