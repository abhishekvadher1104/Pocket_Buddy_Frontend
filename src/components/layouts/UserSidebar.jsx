import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "../../styles/userCss/userSidebar.module.css";
import axios from "axios";

const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const setProfileData = async () => {
      const res = await axios.get(`/user/${userId}`);
      const fullName = res.data.data.firstName + " " + res.data.data.lastName;
      setName(fullName);
      setImg(res.data.data.profilePic);
    };
    setProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.sidebarContainer}>
      <div></div>
      <button
        className={styles.toggleBtn}
        title="Sidebar"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "◀" : "▶"}
      </button>

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.img}>
          <img
            style={{ height: "120px", width: "120px", borderRadius: "50%" }}
            src={img}
            alt=""
          />
        </div>
        <div className={styles.sidebarHeader}>
          {
            <span style={{ fontSize: "25px" }} className="brand-text">
              {name}
            </span>
          }
        </div>
        <nav className={styles.sidebarMenu}>
          <ul>
            <li>
              {isSidebarOpen && (
                <Link to="seeoffers" className={styles.navLink}>
                  <span>📅See Offers</span>
                </Link>
              )}
            </li>
            <li>
              {isSidebarOpen && (
                <Link to="history" className={styles.navLink}>
                  <span>🕒History</span>
                </Link>
              )}
            </li>
            <li>
              {isSidebarOpen && (
                <Link to="profile" className={styles.navLink}>
                  <span> 🧑Profile</span>
                </Link>
              )}
            </li>
            <li>
              {isSidebarOpen && (
                <Link to="ratings" className={styles.navLink}>
                  <span>⭐Ratings</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {isSidebarOpen && (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserSidebar;
