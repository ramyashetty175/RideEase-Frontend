import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      {/* Newsletter Section */}
<div className="max-w-7xl mx-auto px-6 py-12">
  <div className="bg-gray-50 p-8 rounded-lg text-center flex flex-col items-center gap-4">
    <h3 className="text-xl font-bold text-gray-800">Subscribe to RideEase Updates</h3>
    <p className="text-sm text-gray-500">
      Get the latest car and bike rental news, offers, and updates straight to your inbox.
    </p>
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
        Subscribe
      </button>
    </div>
  </div>
</div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Section */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-gray-800">RideEase</h2>
          <p className="text-sm text-gray-500 mt-2">
            Your trusted partner for renting cars and bikes effortlessly.
          </p>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Solutions</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-600">
            <li><Link to="/cars" className="hover:text-black">Cars</Link></li>
            <li><Link to="/bikes" className="hover:text-black">Bikes</Link></li>
            <li><Link to="/bookings" className="hover:text-black">Bookings</Link></li>
            <li><Link to="/offers" className="hover:text-black">Offers</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Support</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">How it works</a></li>
            <li><Link to="/support" className="hover:text-black">Submit Ticket</Link></li>
            <li><a href="#" className="hover:text-black">FAQs</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Company</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-black">About</Link></li>
            <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
            <li><Link to="/jobs" className="hover:text-black">Jobs</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Legal</h3>
          <ul className="flex flex-col gap-1 text-sm text-gray-600">
            <li><Link to="/terms" className="hover:text-black">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
            <li><Link to="/license" className="hover:text-black">License</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar with Left-aligned Copyright */}
      <div className="border-t py-4 px-6 text-sm text-gray-500 text-left">
        © {new Date().getFullYear()} RideEase. All rights reserved.
      </div>

    </footer>
  );
}
