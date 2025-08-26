import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PencilSquareIcon, 
  PlusCircleIcon, 
  MagnifyingGlassIcon, 
  ListBulletIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import api from "../services/api";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    stats: true,
    activities: true
  });
  const [error, setError] = useState({
    user: null,
    stats: null,
    activities: null
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        if (response.data.profilePic) {
          localStorage.setItem("profilePic", response.data.profilePic);
        }
      } catch (err) {
        setError(prev => ({...prev, user: err.response?.data?.message || "Failed to load profile"}));
      } finally {
        setLoading(prev => ({...prev, user: false}));
      }
    };
    fetchUserData();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/dashboard/stats/${userId}`);
        setStats(response.data);
      } catch (err) {
        setError(prev => ({...prev, stats: err.response?.data?.message || "Failed to load statistics"}));
      } finally {
        setLoading(prev => ({...prev, stats: false}));
      }
    };
    fetchStats();
  }, []);

  // Fetch recent activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`/activities/${userId}`);
        setActivities(response.data);
      } catch (err) {
        setError(prev => ({...prev, activities: err.response?.data?.message || "Failed to load activities"}));
      } finally {
        setLoading(prev => ({...prev, activities: false}));
      }
    };
    fetchActivities();
  }, []);

  const features = [
    {
      title: "Post New Donation",
      icon: <PlusCircleIcon className="w-10 h-10 text-gold-500" />,
      description: "Share your excess food with the community",
      link: "/donate",
      bgColor: "bg-ivory-50"
    },
    {
      title: "Browse Donations",
      icon: <MagnifyingGlassIcon className="w-10 h-10 text-royal-500" />,
      description: "Find fresh food near you",
      link: "/donationsList",
      bgColor: "bg-ivory-50"
    },
    {
      title: "Your Claims",
      icon: <ListBulletIcon className="w-10 h-10 text-purple-500" />,
      description: "Track your food claims and history",
      link: "/your-claims",
      bgColor: "bg-ivory-50"
    }
  ];

  const refreshData = async () => {
    setLoading({ user: true, stats: true, activities: true });
    setError({ user: null, stats: null, activities: null });
    
    try {
      const userId = localStorage.getItem("userId");
      const [userRes, statsRes, activitiesRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/dashboard/stats/${userId}`),
        api.get(`/activities/${userId}`)
      ]);
      
      setUserData(userRes.data);
      setStats(statsRes.data);
      setActivities(activitiesRes.data);
      
      // Update localStorage
      localStorage.setItem("name", userRes.data.name);
      localStorage.setItem("email", userRes.data.email);
      if (userRes.data.profilePic) {
        localStorage.setItem("profilePic", userRes.data.profilePic);
      }
    } catch (err) {
      setError({
        user: err.response?.data?.message || "Failed to refresh data",
        stats: err.response?.data?.message || "Failed to refresh data",
        activities: err.response?.data?.message || "Failed to refresh data"
      });
    } finally {
      setLoading({ user: false, stats: false, activities: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={refreshData}
          className="flex items-center gap-1 text-sm text-royal-600 hover:text-royal-800"
          disabled={loading.user || loading.stats || loading.activities}
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading.user || loading.stats || loading.activities ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative group">
          <img 
            src={userData?.profilePic || "https://via.placeholder.com/150"} 
            alt={userData?.name || "User"} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <Link 
            to="/edit-profile"
            className="absolute bottom-0 right-0 bg-gold-500 p-2 rounded-full transform translate-y-1/4 group-hover:scale-110 transition-all"
          >
            <PencilSquareIcon className="w-5 h-5 text-white" />
          </Link>
        </div>
        
        <div>
          {loading.user ? (
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : error.user ? (
            <p className="text-red-500">{error.user}</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-royal-800">
                Welcome back, {userData?.name || localStorage.getItem("name") || "User"}!
              </h1>
              <p className="text-gray-600">{userData?.email || localStorage.getItem("email") || ""}</p>
              <p className="mt-2 text-gray-700 max-w-lg">
                {userData?.bio || "You've helped reduce food waste in your community. Keep up the good work!"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading.stats ? (
          Array(3).fill().map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))
        ) : error.stats ? (
          <div className="col-span-3 p-4 bg-red-50 text-red-600 rounded-lg">
            {error.stats}
          </div>
        ) : stats ? (
          <>
            <div className="bg-gradient-to-r from-royal-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-medium">Total Donations</h3>
              <p className="text-3xl font-bold mt-2">{stats.totalDonations || 0}</p>
              <p className="text-royal-200 mt-1">
                {stats.weeklyDonations > 0 ? `+${stats.weeklyDonations} this week` : "No donations this week"}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-medium">Food Saved</h3>
              <p className="text-3xl font-bold mt-2">{stats.foodSavedKg || 0}kg</p>
              <p className="text-gold-200 mt-1">≈ {stats.mealsSaved || 0} meals</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-medium">Community Impact</h3>
              <p className="text-3xl font-bold mt-2">{stats.peopleHelped || 0}</p>
              <p className="text-green-200 mt-1">people helped</p>
            </div>
          </>
        ) : null}
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-semibold text-royal-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link 
            to={feature.link} 
            key={index}
            className={`${feature.bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 border border-gray-100`}
          >
            <div className="flex items-center gap-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="mt-3 text-gray-600">{feature.description}</p>
            <div className="mt-4 text-gold-600 font-medium flex items-center gap-1">
              Get started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-royal-800 mb-4">Recent Activity</h2>
        {loading.activities ? (
          <div className="space-y-4">
            {Array(3).fill().map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : error.activities ? (
          <p className="text-red-500">{error.activities}</p>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'donation' ? 'bg-green-100' : 
                  activity.type === 'claim' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {activity.type === 'donation' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : activity.type === 'claim' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-500">
                    {activity.details} • {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity found</p>
        )}
      </div>
    </div>
  );
}