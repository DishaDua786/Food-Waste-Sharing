import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DonateForm from './pages/DonateForm'
import DonationsList from './pages/DonationsList'
import ClaimHistory from './pages/ClaimHistory'
import Feedback from './pages/Feedback'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="min-h-screen bg-ivory-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/donationsList" element={<DonationsList />} />
          <Route path="/donate" element={
            <ProtectedRoute>
              <DonateForm />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/claims" element={<ProtectedRoute><ClaimHistory/></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
