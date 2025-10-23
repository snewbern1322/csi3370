import React from "react";
import { getSpotifyAuthUrl } from "../spotify";
import './Login.css';

function Login() {
  const handleLogin = () => {
    // Redirect to Spotify login
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to SoundSpace</h1>
        <p>Login with Spotify to start listening and sharing music</p>
        <button onClick={handleLogin} className="login-btn">
          Login with Spotify
        </button>
      </div>
    </div>
  );
}

export default Login;
