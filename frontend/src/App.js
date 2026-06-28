import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 overflow-hidden">
          {user && <Sidebar isOpen={sidebarOpen} userRole={user.role} />}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <Home />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />} />
              <Route path="/courses" element={<Courses user={user} />} />
              <Route path="/courses/:id" element={<CourseDetail user={user} />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
              <Route path="/student-dashboard" element={user?.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/instructor-dashboard" element={user?.role === 'instructor' ? <InstructorDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;