import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../App.css';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        
        <div className="p-4 bg-light min-vh-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
