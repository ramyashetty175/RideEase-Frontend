import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-[#fafafa]">

      {/* Navbar */}
    

      {/* Simple Separator */}
      <Separator />

      {/* Hero Section */}
    
<section className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 py-32 bg-blue-50/30">
  
  <p className="text-lg text-black mb-4 uppercase tracking-wide">
    Vehicle booking, reimagined
  </p>

  <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-snug">
    Rent the perfect vehicle, anytime
  </h1>

  <p className="text-gray-700 max-w-2xl mb-10 leading-relaxed text-lg">
    Search, book, and manage rides effortlessly with real-time availability,
    secure payments, and a seamless booking experience.
  </p>

  <Link to="/login">
    <Button size="lg" className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold">
      Start Your Journey →
    </Button>
  </Link>
</section>
      <Footer />
    </div>
  );
}
