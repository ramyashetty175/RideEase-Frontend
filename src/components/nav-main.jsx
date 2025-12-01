import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function NavMain() {
  const { handleLogout } = useContext(UserContext);
  return (
    <nav className="w-full bg-white shadow-sm py-4 flex items-center px-6">
      
      {/* Left: RideEase */}
      <div className="text-2xl font-bold text-black mr-8">
        <Link to="/">RideEase</Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex justify-center flex-1 space-x-8">
        <Link to="/home">
          <Button variant="ghost" className="text-black px-4 py-2">Home</Button>
        </Link>
        <Link to="/vehiclelist">
          <Button variant="ghost" className="text-black px-4 py-2">List Vehicles</Button>
        </Link>
        <Link to="/bookings">
          <Button variant="ghost" className="text-black px-4 py-2">Bookings</Button>
        </Link>
        <Link to="/users">
          <Button variant="ghost" className="text-black px-4 py-2">Users</Button>
        </Link>

        {/* Account Dropdown */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Button variant="ghost" className="text-black px-4 py-2">Account</Button>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="mt-1">
                <div className="flex flex-col gap-1 p-2">
                  {/* Profile */}
                  <Button variant="ghost" className="text-black text-left px-3 py-2">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    className="text-black text-left px-3 py-2"
                    onClick={handleLogout}
                  >
                    Sign out
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}