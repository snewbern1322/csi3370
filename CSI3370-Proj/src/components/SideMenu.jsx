import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideMenu.css";
import { UserContext } from "../UserContext";

function SideMenu({ isOpen, onClose }) {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       // clear user session
    onClose();      // close the menu
    navigate("/");  // redirect to home
  };

  return (
    <>
      {/* Dim overlay */}
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <nav className="side-nav">
          <Link to="/account" onClick={onClose}>Account</Link>
          <Link to="/settings" onClick={onClose}>Settings</Link>

          <a href="#" onClick={onClose}>More</a>

          {/* Logout button visible only if logged in */}
          {user && (
            <button
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#1d88b9",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
