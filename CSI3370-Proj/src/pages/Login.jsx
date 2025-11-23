import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../UserContext";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ username: "", email: "", user_type: "standard" });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const BASE_URL = "http://localhost:5000/api/users";

  // Fetch users for mock login
  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectUser = (e) => {
    const user = users.find(u => u.user_id === Number(e.target.value));
    setSelectedUser(user || null);
    setEditingUser(null);
    setViewingUser(null);
  };

  const viewUser = () => {
    if (!selectedUser) return;
    setViewingUser(selectedUser);
  };

  const handleLogin = () => {
    if (!selectedUser) return setMessage("Select a user to log in.");
    login(selectedUser);
    navigate("/"); // redirect to home/library
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL, formData);
      setMessage("User created successfully!");
      setFormData({ username: "", email: "", user_type: "standard" });
      setIsRegistering(false);
      setUsers([...users, res.data]);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create user");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/${editingUser.user_id}`, editingUser);

      // Update users list
      setUsers(users.map(u => u.user_id === editingUser.user_id ? editingUser : u));

      // Update viewing user if currently open
      if (viewingUser?.user_id === editingUser.user_id) {
        setViewingUser(editingUser);
      }

      setEditingUser(null);
      setMessage("User updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to update user");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await axios.delete(`${BASE_URL}/${selectedUser.user_id}`);
      setUsers(users.filter(u => u.user_id !== selectedUser.user_id));
      setSelectedUser(null);
      setEditingUser(null);
      setViewingUser(null);
      setMessage("User deleted successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to delete user");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isRegistering ? "Create Account" : "Welcome Back"}</h1>
        <p className="subtitle">
          {isRegistering
            ? "Fill in your details to create an account"
            : "Select an existing user to login"}
        </p>

        {message && <div className="message-box">{message}</div>}

        {/* Registration Form */}
        {isRegistering && (
          <form onSubmit={handleRegister} className="login-form">
            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>User Type</label>
              <select name="user_type" value={formData.user_type} onChange={handleChange}>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <button type="submit" className="login-button">Create Account</button>
          </form>
        )}

        {/* Login / User Actions */}
        {!isRegistering && (
          <>
            <div className="input-group">
              <label>Select User</label>
              <select value={selectedUser?.user_id || ""} onChange={handleSelectUser}>
                <option value="">-- Choose a user --</option>
                {users.map(u => (
                  <option key={u.user_id} value={u.user_id}>
                    {u.username} ({u.user_type})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="user-actions">
                <button className="action-button" onClick={() => setEditingUser(selectedUser)}>Edit Info</button>
                <button className="action-button" onClick={viewUser}>View Info</button>
                <button className="action-button" style={{ backgroundColor: "#f44336" }} onClick={handleDelete}>Delete</button>
              </div>
            )}

            {/* View User */}
            {viewingUser && (
              <div className="user-info-box">
                <h3>User Info</h3>
                <p><strong>Username:</strong> {viewingUser.username}</p>
                <p><strong>Email:</strong> {viewingUser.email}</p>
                <p><strong>Type:</strong> {viewingUser.user_type}</p>
                <button className="create-account-button" onClick={() => setViewingUser(null)}>Close</button>
              </div>
            )}

            {/* Edit User Form */}
            {editingUser && (
              <form className="login-form" onSubmit={handleSaveEdit}>
                <div className="input-group">
                  <label>Username</label>
                  <input name="username" value={editingUser.username} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input name="email" value={editingUser.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>User Type</label>
                  <select name="user_type" value={editingUser.user_type} onChange={handleChange}>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <button type="submit" className="login-button">Save</button>
                <button type="button" className="create-account-button" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            )}

            <button className="login-button" onClick={handleLogin}>Log In</button>
          </>
        )}

        <div className="divider"><span>or</span></div>
        <button type="button" className="create-account-button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Back to Login" : "Create Account"}
        </button>
      </div>
      <footer className="footer-space"></footer>
    </div>
  );
};

export default Login;
