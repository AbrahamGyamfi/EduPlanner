import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import Navbar from "./navbar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {/* Left: Toggle & Search */}
        <div className="sidebar-left">
          <button 
            className="nav-icon" 
            onClick={() => setIsOpen(!isOpen)} 
            style={{
              background: "linear-gradient(135deg, #16694a, #34495e)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              padding: "10px 15px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
          <span 
            className="search-icon" 
            style={{
              background: "linear-gradient(135deg, #16694a, #34495e)",
              borderRadius: "50%",
              color: "white",
              padding: "10px",
              fontSize: "16px",
              marginLeft: "10px",
              display: "inline-block",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        {/* Right: Navbar Component */}
        <div className="navbar-container">
          <Navbar />
        </div>
      </div>

      {/* Sidebar & Overlay */}
      <div className={`sidebar ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}>
        <nav onClick={(e) => e.stopPropagation()}>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>📊 Dashboard</NavLink></li>
            <li><NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>📚 Courses</NavLink></li>
            <li><NavLink to="/schedule" className={({ isActive }) => isActive ? "active" : ""}>🗓️ Schedule</NavLink></li>
            <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>👤 Profile</NavLink></li>
            <li><NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>⚙️ Settings</NavLink></li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
