import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = ({ user, onLogout, onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PH</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">Project Horizon</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition">
                  Courses
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                  <FiUser size={20} />
                  <span className="hidden sm:inline">{user.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-1"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </>
            )}
            <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-blue-600">
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;