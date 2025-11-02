import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState(""); // for visual feedback

  const navigate = useNavigate(); // for redirecting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegistering
      ? "http://localhost:5000/api/users/register"
      : "http://localhost:5000/api/users/login";

    const data = isRegistering
      ? formData
      : { username: formData.username, password: formData.password };

    try {
      const response = await axios.post(url, data);
      setMessage(response.data.message); // show message on page

      if (isRegistering) {
        // After account creation, wait 2 seconds, then redirect to home
        setTimeout(() => {
          setIsRegistering(false);
          setFormData({ firstName: "", lastName: "", username: "", password: "" });
          setMessage(""); // clear message
          navigate("/"); // redirect to home
        }, 2000);
      } else {
        // For login, you can handle storing user/session here
        console.log("Logged in user:", response.data.user);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isRegistering ? "Create Account" : "Welcome Back"}</h1>
        <p className="subtitle">
          {isRegistering
            ? "Fill in your details to create an account"
            : "Log in to access your music world"}
        </p>

        {message && <div className="message-box">{message}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <>
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            {isRegistering ? "Create Account" : "Log In"}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="create-account-button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Back to Login" : "Create Account"}
          </button>
        </form>
      </div>

      <footer className="footer-space"></footer>
    </div>
  );
};

export default Login;
