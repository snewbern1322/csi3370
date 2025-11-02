// src/components/SideMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";

function SideMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Dim overlay */}
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <nav className="side-nav">
          {/* Use Link so these navigate within the app */}
          <Link to="/account" onClick={onClose}>Account</Link>
          <Link to="/settings" onClick={onClose}>Settings</Link>

          {/* Keep these as simple anchors/buttons like before */}
          <a href="#" onClick={onClose}>More</a>
          <a href="#" onClick={onClose}>Logout</a>
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
