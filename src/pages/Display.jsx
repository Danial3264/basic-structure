import React, { useState } from 'react';
import { FaHome, FaCog, FaUser, FaSignOutAlt, FaBars, FaPeopleCarry } from 'react-icons/fa';
import { IoIosCreate } from "react-icons/io";
import { MdCreateNewFolder, MdProductionQuantityLimits } from "react-icons/md";
import CreateOrder from './orders/CreateOrder';
import Dashboard from './Dashboard';
import Orders from './orders/Orders';
import ViewProduct from './products/ViewProduct';
import AddNewProduct from './products/AddNewProduct';

const Display = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'addNewProduct':
        return <AddNewProduct onProductCreated={() => setSelectedMenu('viewProducts')} />;
      case 'viewProducts':
        return <ViewProduct />;
      case 'createOrder':
        return <CreateOrder onOrderCreated={() => setSelectedMenu('orders')} />;
      case 'orders':
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex-shrink-0 p-4 
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isSidebarOpen ? 'block' : 'hidden'} 
          md:block transition-all duration-300 fixed md:relative z-50 h-full`}
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
            onClick={() => setSelectedMenu('dashboard')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'dashboard' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaHome size={20} className={`${selectedMenu === 'dashboard' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Dashboard</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('addNewProduct')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'addNewProduct' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <IoIosCreate size={20} className={`${selectedMenu === 'addNewProduct' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Create New Product</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('viewProducts')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'viewProducts' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <MdProductionQuantityLimits size={20} className={`${selectedMenu === 'viewProducts' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>View Products</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('createOrder')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'createOrder' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <IoIosCreate size={20} className={`${selectedMenu === 'createOrder' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Create Order</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('orders')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'orders' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaPeopleCarry size={20} className={`${selectedMenu === 'orders' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Orders</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('settings')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'settings' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaCog size={20} className={`${selectedMenu === 'settings' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Settings</span>}
          </li>

          <li
            onClick={() => setSelectedMenu('profile')}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer 
              ${selectedMenu === 'profile' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
          >
            <FaUser size={20} className={`${selectedMenu === 'profile' ? 'text-yellow-400' : ''}`} />
            {isSidebarOpen && <span>Profile</span>}
          </li>

          <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* Content area */}
      <div className="flex-grow p-4 md:ml-20 transition-all duration-300">
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 md:hidden bg-gray-800 p-2 rounded"
        >
          <FaBars size={24} />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Display;
