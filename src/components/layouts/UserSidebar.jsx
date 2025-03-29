import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import offerIcon from "../../assets/images/offer.png";
import userIcon from "../../assets/images/user.png";
import historyIcon from "../../assets/images/refresh.png";
import styles from "../../styles/userCss/userSidebar.module.css";

const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.sidebarContainer}>
      <button className={styles.toggleBtn} title="Sidebar" onClick={toggleSidebar}>
        {isSidebarOpen ? "◀" : "▶"}
      </button>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <nav className={styles.sidebarMenu}>
          <ul>
            <li>
              <img src={offerIcon} alt="Offers" />
              {isSidebarOpen && <Link to="seeoffers" className={styles.navLink}>See Offers</Link>}
            </li>
            <li>
              <img src={historyIcon} alt="History" />
              {isSidebarOpen && <Link to="history" className={styles.navLink}>History</Link>}
            </li>
            <li>
              <img src={userIcon} alt="Profile" />
              {isSidebarOpen && <Link to="profile" className={styles.navLink}>Profile</Link>}
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        {isSidebarOpen && (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserSidebar;
