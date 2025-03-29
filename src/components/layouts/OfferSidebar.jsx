import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/offerSidebar.css";

export const OfferSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Logout function
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("id"); // Remove stored user session
    localStorage.removeItem("role"); // Remove stored user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="main-container">
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "◀" : "▶"}
      </button>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <span className="brand-text">AdminLTE 4</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/restro_owner/addoffer" className="nav-link">
                <i className="icon bi bi-speedometer"></i>
                <span>ADD Offer</span>
              </Link>
            </li>
            <li>
              <Link to="/restro_owner/seeoffers" className="nav-link">
                <i className="icon bi bi-speedometer"></i>
                <span>See My Offers</span>
              </Link>
            </li>
            <li>
              <Link to='/profile' className="nav-link">
                <i className="icon bi bi-box-seam-fill"></i>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          <i className="icon bi bi-box-arrow-right"></i>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
