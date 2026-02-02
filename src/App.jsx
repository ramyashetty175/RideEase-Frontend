import { Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import PrivateRoute from "./components/PrivateRoute";
import Vehicle from "./pages/Vehicle";
import VehicleList from "./pages/VehicleList";
import BookingList from "./pages/BookingList";
import { Navbar }  from "./components/Navbar";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import './App.css';
import { useDispatch } from 'react-redux';
import OwnerList from "./pages/Admin/OwnerList";
import UsersList from "./pages/UsersList";
import { fetchOwner } from "./slices/ownerSlice";
import { fetchBooking } from "./slices/bookingSlice";
import { fetchVehicles } from "./slices/vehicleSlice";
import Transactions from "./pages/Transactions";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import OwnerAddVehicle from "./pages/Owner/OwnerAddVehicle";
import OwnerProfile from "./pages/Owner/OwnerProfile";
import AdminProfile from "./pages/Admin/AdminProfile";
import Users from "./pages/Users";
import VehicleBooking from "./pages/VehicleBooking";
import MyBookings from "./pages/MyBookings";
import UserBookings from "./pages/UserBookings";
import OwnerDetailsTable from "./pages/Admin/OwnerDetailsTable";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(UserContext);
  const token = localStorage.getItem("token");

useEffect(() => {
  if (token) {
    dispatch(fetchOwner());
    dispatch(fetchBooking());
    dispatch(fetchVehicles());
  }
}, [token, dispatch]);

  return(
      <div>
          {( isLoggedIn || localStorage.getItem('token')) && (
            <> 
              <Navbar />
              <Separator />
            </>
          )}
          {(!isLoggedIn && !localStorage.getItem('token')) && (
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
          )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />

        <Route path="/dashboard/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/dashboard/owner" element={<PrivateRoute allowedRoles={['owner']}><OwnerDashboard /></PrivateRoute>} />
         
        <Route path="/dashboard/admin/profile" element={<PrivateRoute allowedRoles={['admin']}><AdminProfile /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/all" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/user" element={<PrivateRoute allowedRoles={['admin']}><Users /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/new-request" element={<PrivateRoute allowedRoles={['admin']}><OwnerList status="pending" /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/owners/approve" element={<PrivateRoute allowedRoles={['admin']}><OwnerList status="approved" /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/owners/reject" element={<PrivateRoute allowedRoles={['admin']}><OwnerList status="rejected" /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/owners/approve/:id" element={<PrivateRoute allowedRoles={['admin']}><OwnerDetailsTable /></PrivateRoute>} />
      
        <Route path="/dashboard/admin/vehicles/all" element={<PrivateRoute allowedRoles={['admin']}><VehicleList /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/new-request" element={<PrivateRoute allowedRoles={['admin']}><VehicleList status="pending" /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/approve" element={<PrivateRoute allowedRoles={['admin']}><VehicleList status="approved" /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/reject" element={<PrivateRoute allowedRoles={['admin']}><VehicleList status="rejected" /></PrivateRoute>} />
  
        <Route path="/dashboard/admin/bookings/all" element={<PrivateRoute allowedRoles={['admin']}><BookingList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/new-request" element={<PrivateRoute allowedRoles={['admin']}><BookingList status="pending" /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/approve" element={<PrivateRoute allowedRoles={['admin']}><BookingList status="confirmed" /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/cancel" element={<PrivateRoute allowedRoles={['admin']}><BookingList status="canceled" /></PrivateRoute>} />
 
        <Route path="/dashboard/owner/profile" element={<PrivateRoute allowedRoles={['owner']}><OwnerProfile /></PrivateRoute>} /> 
        <Route path="/dashboard/owner/users/new-request" element={<PrivateRoute allowedRoles={['admin']}><OwnerList /></PrivateRoute>} />
        
        <Route path="/dashboard/owner/bookings/all" element={<PrivateRoute allowedRoles={['owner']}><BookingList /></PrivateRoute>} />
        <Route path="/dashboard/owner/bookings/new-request" element={<PrivateRoute allowedRoles={['owner']}><BookingList status="pending" /></PrivateRoute>} />
        <Route path="/dashboard/owner/bookings/approve" element={<PrivateRoute allowedRoles={['owner']}><BookingList status="confirmed" /></PrivateRoute>} />
        <Route path="/dashboard/owner/bookings/cancel" element={<PrivateRoute allowedRoles={['owner']}><BookingList status="canceled" /></PrivateRoute>} />

        <Route path="/dashboard/owner/vehicles/all" element={<PrivateRoute allowedRoles={['owner']}><VehicleList /></PrivateRoute>} />
        <Route path="/dashboard/owner/vehicles/add" element={<PrivateRoute allowedRoles={['owner']}><OwnerAddVehicle /></PrivateRoute>} />
        
        <Route path="/dashboard/profile" element={<PrivateRoute allowedRoles={['user']}><Profile /></PrivateRoute>} />
        <Route path="/dashboard/bookings" element={<PrivateRoute allowedRoles={['user']}><UserBookings /></PrivateRoute>} />
        <Route path="/dashboard/transactions" element={<PrivateRoute allowedRoles={['user']}><Transactions /></PrivateRoute>} />

        <Route path="/dashboard/change-password" element={<PrivateRoute allowedRoles={['user']}><ChangePassword /></PrivateRoute>} />

        <Route path="/vehicle/search" element={<PrivateRoute allowedRoles={['admin', 'owner', 'user']}><SearchPage /></PrivateRoute>} />

        <Route path="/vehicles" element={<PrivateRoute allowedRoles={['admin', 'owner', 'user']}><Vehicle /></PrivateRoute>} />

        <Route path="/bookings" element={<PrivateRoute allowedRoles={['admin', 'owner', 'user']}><MyBookings /></PrivateRoute>} />

        <Route path="vehicles/view/:id" element={<PrivateRoute allowedRoles={['admin', 'owner', 'user']}><VehicleBooking /></PrivateRoute>} />
       
      </Routes>
    </div>
  )
}

export default App;