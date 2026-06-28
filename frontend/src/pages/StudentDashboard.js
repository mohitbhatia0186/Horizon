import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBook, FiAward, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const StudentDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, analyticsRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/progress/dashboard`),
        axios.get(`${process.env.REACT_APP_API_URL}/progress/analytics`)
      ]);
      setStats(statsRes.data.stats);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="text-gray-600">Loading...</div></div>;
  }

  const statCards = [
    { label: 'Courses Enrolled', value: stats?.totalCoursesEnrolled || 0, icon: FiBook, color: 'blue' },
    { label: 'Completed', value: stats?.completedCourses || 0, icon: FiCheckCircle, color: 'green' },
    { label: 'In Progress', value: stats?.inProgressCourses || 0, icon: FiTrendingUp, color: 'orange' },
    { label: 'Avg Quiz Score', value: `${stats?.averageQuizScore || 0}%`, icon: FiAward, color: 'purple' }
  ];

  return (
    <div className="flex-1 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.firstName}!</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              green: 'bg-green-50 text-green-600',
              orange: 'bg-orange-50 text-orange-600',
              purple: 'bg-purple-50 text-purple-600'
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

        {/* Course Progress */}
        {analytics && analytics.courseProgress.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Your Courses</h2>
            <div className="space-y-4">
              {analytics.courseProgress.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.courseName}</h3>
                    <p className="text-sm text-gray-600">{course.category} • {course.status}</p>
                  </div>
                  <div className="w-32">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{course.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;