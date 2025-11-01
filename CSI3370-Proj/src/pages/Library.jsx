// src/pages/Library.jsx
import React, { useState } from "react";
import "./Library.css";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: "My Favorites",
      songs: 12,
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Workout Mix",
      songs: 20,
      cover:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Chill Vibes",
      songs: 15,
      cover:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Evening Jazz",
      songs: 9,
      cover:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Focus Beats",
      songs: 18,
      cover:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const handleDelete = (id) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  // Filter playlists based on search term
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>
          🎵 <span>Your Library</span>
        </h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <section className="playlist-grid">
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <div className="cover-container">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="playlist-cover"
                />
                <button className="play-overlay">▶</button>
              </div>
              <div className="playlist-details">
                <h2>{playlist.name}</h2>
                <p>{playlist.songs} songs</p>
                <div className="actions">
                  <button className="view-btn">View</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(playlist.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No playlists found.</p>
        )}
      </section>

      <section className="recently-played">
        <h2>Recently Played</h2>
        <ul>
          <li>
            <span>🌇 Sunset Drive</span> — <em>Midnight Loop</em>
          </li>
          <li>
            <span>🌌 Echo Dreams</span> — <em>Nova Soul</em>
          </li>
          <li>
            <span>🌃 Lofi Nights</span> — <em>Kairo</em>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Library;
