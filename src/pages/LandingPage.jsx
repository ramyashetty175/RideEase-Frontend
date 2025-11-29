// export default function LandingPage() {
//     return(
//         <div>
//            <h2>Vehicles for Rent</h2>
//            <button>Start Booking Now</button>
//         </div>
//     )
// }
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white">
        <h1 className="text-xl font-bold">RideEase</h1>

        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>

          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Navbar Bottom Border */}
      <Separator />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        
        <p className="text-sm text-gray-500 mb-2">
          Vehicle booking, reimagined
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Rent the perfect vehicle, anytime
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Search, book, and manage rides effortlessly with real-time availability,
          secure payments, and a seamless booking experience.
        </p>

        <Link to="/login">
          <Button size="lg" className="px-6 py-5 text-md">
            Start Your Journey →
          </Button>
        </Link>
      </section>

    </div>
  );
}
