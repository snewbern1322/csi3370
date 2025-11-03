// src/components/Header.jsx
import React, { useState, useContext } from "react";
import "./header.css";
import SideMenu from "./SideMenu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login after logout
  };

  return (
    <>
      <header className="header">
        {/* Hamburger menu */}
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          ☰
        </div>

        {/* Logo */}
        <h1 className="logo">SoundSpace</h1>

        {/* Navigation links */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/library">Library</Link>
          <Link to="/search">Search</Link>
          <Link to="/shareplay">SharePlay</Link>

          {!user ? (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Side menu component */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
