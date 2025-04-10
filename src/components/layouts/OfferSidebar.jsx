import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/offerSidebar.css";
import axios from "axios";

export const OfferSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const restroName = async () => {
      const res = await axios.get(`/user/${userId}`);
      console.log(res.data);
      setName(res.data.data.Restaurant || "no restaurant found");
      setImg(res.data.data.profilePic);
    };
    restroName();
  }, []);
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="main-container">
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? "◀" : "▶"}
      </button>
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
            src={img}
            alt=""
          />
        </div>
        <div
          className="sidebarHeader"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px",
            textTransform: "capitalize",
          }}
        >
          {
            <span style={{ fontSize: "30px" }} className="brand-text">
              {name}{" "}
            </span>
          }
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="addoffer" className="nav-link">
                <i className="icon bi bi-speedometer"></i>
                <span>ADD Offer</span>
              </Link>
            </li>
            <li>
              <Link to="seeoffers" className="nav-link">
                <i className="icon bi bi-speedometer"></i>
                <span>See My Offers</span>
              </Link>
            </li>
            <li>
              <Link to="profile" className="nav-link">
                <i className="icon bi bi-box-seam-fill"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="ratings" className="nav-link">
                <i className="icon bi bi-box-seam-fill"></i>
                <span>⭐Ratings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="icon bi bi-box-arrow-right"></i>
          Logout
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
