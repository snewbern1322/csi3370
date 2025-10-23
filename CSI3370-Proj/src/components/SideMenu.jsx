import React from "react";
import "./SideMenu.css";

function SideMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Dim overlay */}
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <nav className="side-nav">
          <a href="#">Account</a>
          <a href="#">Settings</a>
          <a href="#">More</a>
          <a href="#">Logout</a>
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
