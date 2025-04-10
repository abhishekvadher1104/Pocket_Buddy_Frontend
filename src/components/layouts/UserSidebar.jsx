import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import offerIcon from "../../assets/images/offer.png";
import userIcon from "../../assets/images/user.png";
import historyIcon from "../../assets/images/refresh.png";
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
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
            src={img}
            alt="img not found"
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
              <img src={offerIcon} alt="Offers" />
              {isSidebarOpen && (
                <Link to="seeoffers" className={styles.navLink}>
                  See Offers
                </Link>
              )}
            </li>
            <li>
              <img src={historyIcon} alt="History" />
              {isSidebarOpen && (
                <Link to="history" className={styles.navLink}>
                  History
                </Link>
              )}
            </li>
            <li>
              <img src={userIcon} alt="Profile" />
              {isSidebarOpen && (
                <Link to="profile" className={styles.navLink}>
                  Profile
                </Link>
              )}
            </li>
            <li>
              <p></p>
              {isSidebarOpen && (
                <Link to="ratings" className={styles.navLink}>
                 ⭐ Ratings
                </Link>
              )}
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
