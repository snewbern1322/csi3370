import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [moods, setMoods] = useState([]);
  const [sessions, setSessions] = useState([]);

  // Mock data — replace with API calls later
  useEffect(() => {
    setFeatured([
      { title: "Top Hits 2025", image: "/assets/featured1.jpg" },
      { title: "Chill Vibes", image: "/assets/featured2.jpg" },
      { title: "Workout Boost", image: "/assets/featured3.jpg" },
    ]);
    setMoods([
      { name: "Relaxed", color: "#4caf50" },
      { name: "Focused", color: "#1d88b9" },
      { name: "Happy", color: "#ffb300" },
      { name: "Romantic", color: "#e91e63" },
      { name: "Energetic", color: "#9c27b0" },
    ]);
    setSessions([
      { title: "Study Session 🎧", users: 4 },
      { title: "Evening Chill 💤", users: 12 },
    ]);
  }, []);

  return (
    <div className="home">
      {/* Featured */}
      <section className="section">
        <h2>🎶 Featured Playlists</h2>
        <div className="scroll-container">
          {featured.map((item, i) => (
            <div className="music-card" key={i}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mood Section */}
      <section className="section">
        <h2>💫 Choose Your Mood</h2>
        <div className="mood-grid">
          {moods.map((mood, i) => (
            <div
              key={i}
              className="mood-card"
              style={{ backgroundColor: mood.color }}
            >
              {mood.name}
            </div>
          ))}
        </div>
      </section>

      {/* Live Sessions */}
      <section className="section">
        <h2>🎤 Live SharePlay Sessions</h2>
        {sessions.length ? (
          <ul className="session-list">
            {sessions.map((s, i) => (
              <li key={i} className="session-card">
                <strong>{s.title}</strong>
                <span>{s.users} listeners</span>
                <button>Join</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No live sessions right now. Start one!</p>
        )}
      </section>

      {/* Recently Played */}
      <section className="section">
        <h2>🕒 Recently Played</h2>
        <div className="recent-grid">
          <div className="recent-card">🎵 Ocean Eyes</div>
          <div className="recent-card">🎵 Night Drive</div>
          <div className="recent-card">🎵 Lost in Thought</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
