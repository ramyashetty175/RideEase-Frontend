import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Navbar() {
  return (
    <>
      <nav className="w-full px-6 py-4 bg-white flex items-center justify-between">
        
        {/* Left Side Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          RideEase
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-black">
              Sign In
            </Button>
          </Link>

          <Link to="/register">
            <Button className="bg-black text-white hover:bg-black/80">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
      <Separator />
    </>
  )
}
