// src/pages/Search.jsx
import React, { useState } from "react";
import { searchTracks } from "../spotifyApi";
import "./Search.css";

function Search({ token }) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query || !token) return;
    setLoading(true);
    try {
      const data = await searchTracks(query, token);
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>🔍 Discover Music</h1>
        <p>Find songs, artists, and albums</p>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      {loading && <div className="loading">Searching...</div>}

      <section className="search-results">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div key={track.id} className="song-card">
              <div className="album-art">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="album-img"
                />
                <button className="play-overlay">▶</button>
              </div>
              <div className="song-info">
                <h3>{track.name}</h3>
                <p>{track.artists.map((a) => a.name).join(", ")}</p>
                <p className="album-name">{track.album.name}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="no-results">
              <p>Search for your favorite tracks to get started 🎶</p>
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default Search;
