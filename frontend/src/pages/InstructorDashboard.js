import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBook, FiUsers, FiBarChart2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const InstructorDashboard = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/instructor/my-courses`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: FiBook, color: 'blue' },
    { label: 'Total Students', value: courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0), icon: FiUsers, color: 'green' },
    { label: 'Published', value: courses.filter(c => c.status === 'published').length, icon: FiBarChart2, color: 'purple' }
  ];

  return (
    <div className="flex-1 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <Link to="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2">
            <FiPlus size={20} />
            <span>New Course</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <Icon className={`text-${stat.color}-600 mb-4`} size={24} />
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">My Courses</h2>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading...</div>
          ) : courses.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No courses yet. Create your first course!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Students</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.enrollmentCount || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.rating?.toFixed(1) || '0.0'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;