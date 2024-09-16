import React, { useState } from 'react'
import { FaHome, FaCog, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

const SidebarMenu = () => {


    // State to toggle the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <>
      <div
        className={`bg-gray-800 text-white flex-shrink-0 p-4 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none mb-4"
        >
          <FaBars size={24} />
        </button>

        <ul className="space-y-4">
          <li
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <FaHome size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <FaCog size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </li>
          <li
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <FaUser size={20} />
            {isSidebarOpen && <span>Profile</span>}
          </li>
          <li
            className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </>
  )
}

export default SidebarMenu
