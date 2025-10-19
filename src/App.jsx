import { useState } from 'react'
import { Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from "./pages/Users";
import Account from './pages/Account';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return(
    <div>
      <h1>RideEase</h1>
      <ul>
        <nav>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link>Logout</Link></li>
        </nav>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
