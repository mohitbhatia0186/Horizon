import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiPlay, FiUsers, FiStar, FiClock } from 'react-icons/fi';

const CourseDetail = ({ user }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourseDetail();
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      setCourse(response.data.course);
      checkEnrollment();
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/enrollments/my-enrollments`);
      const enrolled = response.data.enrollments.some(e => e.course._id === id);
      setIsEnrolled(enrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      return window.location.href = '/login';
    }

    try {
      setEnrolling(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/enrollments`, { courseId: id });
      setIsEnrolled(true);
    } catch (error) {
      console.error('Error enrolling:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="text-gray-600">Loading course...</div></div>;
  }

  if (!course) {
    return <div className="flex items-center justify-center h-full"><div className="text-gray-600">Course not found</div></div>;
  }

  return (
    <div className="flex-1 p-4 sm:p-8">
      <Link to="/courses" className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <FiArrowLeft size={20} />
        <span className="ml-2">Back to Courses</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <FiUsers size={20} />
              <span>{course.enrollmentCount} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiStar size={20} />
              <span>{course.rating?.toFixed(1) || '0.0'} rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiClock size={20} />
              <span>{course.duration} hours</span>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600 mb-6">{course.description}</p>

              <h3 className="text-lg font-bold mb-3">Learning Outcomes</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                {course.learningOutcomes?.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-3">Course Modules</h3>
              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{module.title}</h4>
                    <p className="text-sm text-gray-600">{module.lessons?.length || 0} lessons</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Instructor</p>
                  <p className="font-semibold text-gray-900">{course.instructor?.firstName} {course.instructor?.lastName}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Level</p>
                  <p className="font-semibold text-gray-900">{course.level}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Category</p>
                  <p className="font-semibold text-gray-900">{course.category}</p>
                </div>

                {!isEnrolled && (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center space-x-2"
                  >
                    <FiPlay size={20} />
                    <span>{enrolling ? 'Enrolling...' : 'Enroll Now'}</span>
                  </button>
                )}
                {isEnrolled && (
                  <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold text-center">
                    ✓ Enrolled
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;