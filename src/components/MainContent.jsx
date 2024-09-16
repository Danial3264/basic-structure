import React, { useState } from 'react'
import { FaHome, FaCog, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import Search from './Search'


const MainContent = () => {
    const [search, setSearch] = useState('')

    const handleQuery = (query)=>{
        setSearch(query)
    }


   
  return (
    <>
      <div className="flex-grow p-6 bg-gray-100">
        <Search onQuery={handleQuery} />
        <h1 className="text-2xl font-semibold">Main Content Area</h1>
        <p className="mt-4">
          This is where the main content goes. You can use the sidebar to navigate through different sections.
        </p>
      </div>
    </>
  )
}

export default MainContent
