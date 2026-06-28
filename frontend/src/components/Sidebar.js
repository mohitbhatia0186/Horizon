import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiBarChart2, FiSettings, FiUsers } from 'react-icons/fi';

const Sidebar = ({ isOpen, userRole }) => {
  const location = useLocation();

  const getMenuItems = () => {
    const commonItems = [
      { label: 'Courses', path: '/courses', icon: FiBook }
    ];

    const roleItems = {
      student: [
        { label: 'Dashboard', path: '/student-dashboard', icon: FiHome },
        ...commonItems,
        { label: 'My Progress', path: '/student-dashboard', icon: FiBarChart2 }
      ],
      instructor: [
        { label: 'Dashboard', path: '/instructor-dashboard', icon: FiHome },
        ...commonItems,
        { label: 'My Courses', path: '/instructor-dashboard', icon: FiBook },
        { label: 'Analytics', path: '/instructor-dashboard', icon: FiBarChart2 }
      ],
      admin: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: FiHome },
        ...commonItems,
        { label: 'Users', path: '/admin-dashboard', icon: FiUsers },
        { label: 'Analytics', path: '/admin-dashboard', icon: FiBarChart2 }
      ]
    };

    return roleItems[userRole] || commonItems;
  };

  const menuItems = getMenuItems();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`${isOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-md overflow-y-auto`}>
      <div className="p-6 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;