import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <button className="toggle-btn" title="Sidebar" onClick={toggleSidebar}>
        {isSidebarOpen ? "⬅️" : "➡️"}
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <span className="brand-text">AdminLTE 4</span>
        </div>
        
        <nav className="sidebar-menu">
          <ul>
            <li>
              <Link to="seeoffers" className="nav-link">See Offers</Link>
            </li>
            <li>
              <Link to="/theme" className="nav-link">Theme Generate</Link>
            </li>
            <li>
              <Link to="/widgets" className="nav-link">Widgets</Link>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      
      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserSidebar;
