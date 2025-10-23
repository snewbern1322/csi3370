// src/pages/Library.jsx
import React from "react";
import "./Library.css"; // Optional: create for styling

const Library = () => {
  // Sample data for now
  const playlists = [
    { id: 1, name: "My Favorites", songs: 12 },
    { id: 2, name: "Workout Mix", songs: 20 },
    { id: 3, name: "Chill Vibes", songs: 15 },
  ];

  return (
    <div className="library-page">
      <h1>Library</h1>

      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-info">
              <h2>{playlist.name}</h2>
              <p>{playlist.songs} songs</p>
            </div>
            <button className="play-button">Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
