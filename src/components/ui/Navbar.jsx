import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white">
        <h1 className="text-2xl font-bold text-black">RideEase</h1>

        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-black hover:text-blue-600">Sign In</Button>
          </Link>

          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </Link>
        </div>
</nav>  
  );
}
