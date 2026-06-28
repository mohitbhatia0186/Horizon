import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Home = () => {
  const features = [
    { title: 'Comprehensive Courses', description: 'Learn from industry experts with structured courses', icon: FiBook },
    { title: 'Track Progress', description: 'Monitor your learning journey with detailed analytics', icon: FiTrendingUp },
    { title: 'Community', description: 'Connect with thousands of learners worldwide', icon: FiUsers }
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Welcome to Project Horizon</h1>
          <p className="text-xl text-blue-100 mb-8">Your Gateway to Continuous Learning and Skill Development</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <FiArrowRight size={20} />
            </Link>
            <Link to="/courses" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Project Horizon?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <Icon size={40} className="text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;