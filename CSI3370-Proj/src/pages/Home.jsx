import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h2>Recommended Music</h2>
      <div className="music-grid">
        <div className="music-card">🎵 Song 1</div>
        <div className="music-card">🎵 Song 2</div>
        <div className="music-card">🎵 Song 3</div>
      </div>
      <div className="music-grid">
        <div className="music-card">🎵 Song 1</div>
        <div className="music-card">🎵 Song 2</div>
        <div className="music-card">🎵 Song 3</div>
      </div>
      <div className="music-grid">
        <div className="music-card">🎵 Song 1</div>
        <div className="music-card">🎵 Song 2</div>
        <div className="music-card">🎵 Song 3</div>
      </div>
    </div>
  );
}

export default Home;
