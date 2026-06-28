import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiBook, FiBarChart2, FiUserCheck } from 'react-icons/fi';

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/statistics`);
      setStats(response.data.statistics);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="text-gray-600">Loading...</div></div>;
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: 'blue' },
    { label: 'Students', value: stats?.totalStudents || 0, icon: FiUserCheck, color: 'green' },
    { label: 'Instructors', value: stats?.totalInstructors || 0, icon: FiUserCheck, color: 'orange' },
    { label: 'Courses', value: stats?.totalCourses || 0, icon: FiBook, color: 'purple' },
    { label: 'Enrollments', value: stats?.totalEnrollments || 0, icon: FiBarChart2, color: 'red' }
  ];

  return (
    <div className="flex-1 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              green: 'bg-green-50 text-green-600',
              orange: 'bg-orange-50 text-orange-600',
              purple: 'bg-purple-50 text-purple-600',
              red: 'bg-red-50 text-red-600'
            };
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className={`${colorClasses[card.color]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">User Breakdown</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span className="font-semibold">{stats?.totalStudents || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instructors:</span>
                  <span className="font-semibold">{stats?.totalInstructors || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Admins:</span>
                  <span className="font-semibold">{stats?.totalUsers - stats?.totalStudents - stats?.totalInstructors || 0}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Content Summary</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Published Courses:</span>
                  <span className="font-semibold">{stats?.totalCourses || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Enrollments:</span>
                  <span className="font-semibold">{stats?.totalEnrollments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Enrollments/Course:</span>
                  <span className="font-semibold">{stats?.totalCourses > 0 ? Math.round(stats.totalEnrollments / stats.totalCourses) : 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;