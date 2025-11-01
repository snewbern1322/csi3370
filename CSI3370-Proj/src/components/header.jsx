// src/components/Header.jsx
import React, { useState } from "react";
import "./header.css";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";

function Header({ token }) {
  const [menuOpen, setMenuOpen] = useState(false);

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

          {/* Replace Spotify login with your custom login page */}
          {!token ? (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ) : (
            <button className="logout-btn">Logout</button>
          )}
        </nav>
      </header>

      {/* Side menu component */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
