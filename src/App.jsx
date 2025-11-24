import { Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from "./pages/UsersList";
import Account from './pages/Account';
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/ui/PrivateRoute";
import VehicleList from "./pages/VehicleList";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useContext } from "react";
import UserContext from "./context/UserContext";
import './App.css'

function App() {
  const { isLoggedIn, handleLogout } = useContext(UserContext);
  const { user } = useContext(UserContext);
  return(
    <div>
      <h1>RideEase</h1>
      <ul>
          {( isLoggedIn || localStorage.getItem('token')) && (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/vehiclelist">List Vehicles</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/account">Account</Link></li>
              { (user?.role == "admin" || user?.role == "owner") && <li><Link to="/users">Users</Link></li> }
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          )}
          {( !isLoggedIn || !localStorage.getItem('token')) && (
            <>
              {/* <li><Link to="/register">Register</Link></li> */}
              <li><Link to="/vehicles">Vehicles</Link></li>
              <li><Link to="/"><button>Get Started</button></Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </>
          )}
      </ul>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/account" element={<PrivateRoute allowedRoles={['admin', 'user']}><Account /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute allowedRoles={['admin', 'user']}><Dashboard /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute allowedRoles={['admin', 'user']}><Users /></PrivateRoute>} />
        <Route path="/vehiclelist" element={<PrivateRoute allowedRoles={['admin', 'user']}><VehicleList /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute allowedRoles={['admin', 'user']}><Users /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App;