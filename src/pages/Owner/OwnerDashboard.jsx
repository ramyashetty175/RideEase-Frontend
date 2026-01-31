"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { useState, useEffect } from "react";

export default function OwnerDashboard() {
  const [users, setUsers] = useState([]);
  const { data: bookingData } = useSelector((state) => state.booking);
  const { data: vehicleData } = useSelector((state) => state.vehicle);
  
  useEffect(() => {
          const fetchUsersList = async () => {
              try {
                  const response = await axios.get('/users/listUsers', { headers: { Authorization: localStorage.getItem('token')}});
                  setUsers(response.data);
              } catch(err) {
                  console.log(err);
              }
          }
          fetchUsersList();
  }, [])

  const totalBookings = bookingData?.length || 0;
  const totalVehicles = vehicleData?.length || 0;
  const totalUsers = users?.length || 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-white shadow-md p-4 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold">Total Vehicles</h2>
              <p className="text-3xl mt-2">{totalVehicles}</p>
            </div>
            <div className="aspect-video rounded-xl bg-white shadow-md p-4 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold">Total Bookings</h2>
              <p className="text-3xl mt-2">{totalBookings}</p>
            </div>
            <div className="aspect-video rounded-xl bg-white shadow-md p-4 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl mt-2">{totalUsers}</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}