import React from 'react'
import SidebarMenu from '../components/SidebarMenu';
import MainContent from '../components/MainContent';

const Home = () => {
  return (
      <div className="min-h-screen flex">
        <SidebarMenu />
        <MainContent />
    </div>
  );
};


export default Home
