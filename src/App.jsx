import { Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from "./pages/UsersList";
import Account from './pages/Account';
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import LandingPage from "./pages/LandingPage";
import BookingListList from "./pages/BookingList";
import SearchPage from "./pages/SearchPage";
import PrivateRoute from "./components/PrivateRoute";
import Vehicle from "./pages/Vehicle";
import VehicleList from "./pages/VehicleList";
import BookingList from "./pages/BookingList";
import { Navbar }  from "./components/Navbar";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useContext, useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import './App.css';
import { useDispatch } from 'react-redux';
import OwnerList from "./pages/Admin/OwnerList";
import UsersList from "./pages/UsersList";
import { fetchOwner } from "./slices/ownerSlice";
import { fetchBooking } from "./slices/bookingSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, handleLogout, user } = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(fetchOwner());
      dispatch(fetchBooking());
    }
  },[dispatch])

  return(
     <div>
          {( isLoggedIn || localStorage.getItem('token')) && (
            <> 
              {/* <li><Link to="/home">Home</Link></li>
              <li><Link to="/vehiclelist">List Vehicles</Link></li>
              { (user?.role == 'admin' || user?.role == 'owner' || user?.role == 'user') && <li><Link to="/bookings">Bookings</Link></li> }
              { (user?.role == 'admin' || user?.role == 'owner') && <li><Link to="/users">Users</Link></li> }
              { (user?.role == 'admin' || user?.role == 'owner' || user?.role == 'user') && <li><Link to="/search">Search</Link></li> }
              <li>
              <button onClick={handleLogout}>Logout</button>
              </li> */}
              <Navbar />
            </>
          )}
          {(!isLoggedIn && !localStorage.getItem('token')) && (
            <> 
              {/* <button><Link to="/login">Sign In</Link></button>
              <button><Link to="/register">Get Started</Link></button> */}
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
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/account" element={<PrivateRoute allowedRoles={['admin', 'user']}><Account /></PrivateRoute>} />

        <Route path="/dashboard/admin" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/dashboard/owner" element={<PrivateRoute allowedRoles={['owner']}><OwnerDashboard /></PrivateRoute>} />
        <Route path="/dashboard/user" element={<PrivateRoute allowedRoles={['user']}><Dashboard /></PrivateRoute>} />

        <Route path="/dashboard/admin/users/all" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/owners" element={<PrivateRoute allowedRoles={['admin']}><OwnerList /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/user" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/users/new-request" element={<PrivateRoute allowedRoles={['admin']}><OwnerList /></PrivateRoute>} />
        
        <Route path="/dashboard/admin/bookings/all" element={<PrivateRoute allowedRoles={['admin']}><BookingList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/new-request" element={<PrivateRoute allowedRoles={['admin']}><BookingListList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/approve" element={<PrivateRoute allowedRoles={['admin']}><BookingListList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/in-progress" element={<PrivateRoute allowedRoles={['admin']}><BookingListList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/reject" element={<PrivateRoute allowedRoles={['admin']}><BookingListList /></PrivateRoute>} />
        <Route path="/dashboard/admin/bookings/cancel-request" element={<PrivateRoute allowedRoles={['admin']}><BookingListList /></PrivateRoute>} />

        <Route path="/dashboard/admin/vehicles/all" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/add" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/new-request" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/approve" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />
        <Route path="/dashboard/admin/vehicles/reject" element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>} />

        <Route path="/search" element={<PrivateRoute allowedRoles={['admin', 'owner', 'user']}><SearchPage /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App;