import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom' // Changed from Link to NavLink
import { useTheme } from '../contexts/ThemeContext'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const isAuth = !!localStorage.getItem('token')
  const name = localStorage.getItem('name') || ''

  // Active link style function
  const getNavLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? '600' : '400',
    color: isActive 
      ? theme === 'dark' ? '#f5f5f5' : '#1a365d' 
      : theme === 'dark' ? '#d1d5db' : '#4b5563',
    transition: 'all 0.2s ease'
  })

  return (
    <nav className="bg-white dark:bg-royal-500 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-500 to-purple-700 flex items-center justify-center text-ivory-50 font-serif text-lg">
            FW
          </div>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-serif text-2xl ${isActive 
                ? 'text-royal-600 dark:text-ivory-100' 
                : 'text-royal-500 dark:text-ivory-50'}`
            }
          >
            Food Waste Sharing
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <NavLink 
            to="/donationsList" 
            style={getNavLinkStyle}
            className="hidden md:inline text-sm hover:underline"
          >
            Explore
          </NavLink>
          
          {isAuth ? (
            <>
              <NavLink 
                to="/dashboard" 
                style={getNavLinkStyle}
                className="text-sm hover:underline"
              >
                Dashboard
              </NavLink>
              <button 
                className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
                onClick={() => { localStorage.clear(); navigate('/'); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                style={getNavLinkStyle}
                className="text-sm hover:underline"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="ml-2 px-3 py-1 rounded bg-gold-500 text-white hover:bg-gold-600 transition-colors"
              >
                Sign up
              </NavLink>
            </>
          )}

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-royal-600 transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-gold-500"/>
            ) : (
              <MoonIcon className="w-5 h-5 text-royal-500"/>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}