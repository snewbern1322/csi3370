import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [privateSession, setPrivateSession] = useState(false);

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="setting-item">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
        <div className="setting-item">
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
        <div className="setting-item">
          <label>Private Session</label>
          <input
            type="checkbox"
            checked={privateSession}
            onChange={() => setPrivateSession(!privateSession)}
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>Account Management</h2>
        <button className="settings-btn">Change Password</button>
        <button className="settings-btn danger">Delete Account</button>
      </div>
    </div>
  );
}

export default Settings;
