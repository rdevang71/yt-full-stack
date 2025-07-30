// src/components/Sidebar/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <nav className="sidebar-links">
        <a href="/" className="text-white text-decoration-none">Home</a>
        <a href="#" className="text-white text-decoration-none">Trending</a>
        <a href="#" className="text-white text-decoration-none">Library</a>
      </nav>
    </div>
  );
};

export default Sidebar;