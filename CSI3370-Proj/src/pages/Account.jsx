import React, { useState } from "react";
import "./Account.css";

function Account() {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Steven",
    lastName: "Newbern",
    username: "steven_dev",
    email: "steven@example.com",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    // later: send updated info to MySQL backend
  };

  return (
    <div className="account-page">
      <h1>Your Account</h1>

      <div className="account-card">
        <div className="profile-avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/456/456141.png"
            alt="Profile"
          />
        </div>

        <div className="profile-info">
          <label>First Name</label>
          <input
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            disabled={!editing}
          />

          <label>Last Name</label>
          <input
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            disabled={!editing}
          />

          <label>Username</label>
          <input
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            disabled={!editing}
          />

          <label>Email</label>
          <input
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="account-buttons">
          {editing ? (
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="edit-btn">
              Edit Info
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
