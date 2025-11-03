// src/components/SideMenu.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import { UserContext } from "../UserContext";

function SideMenu({ isOpen, onClose }) {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose(); // close side menu
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <nav className="side-nav">
          <Link to="/account" onClick={onClose}>Account</Link>
          <Link to="/settings" onClick={onClose}>Settings</Link>
          <a href="#" onClick={onClose}>More</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
