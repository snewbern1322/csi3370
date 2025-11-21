// src/pages/Library.jsx
import React, { useEffect, useState } from "react";
import "./Library.css";

const Library = () => {
  // -------------------------------
  // State variables for playlists
  // -------------------------------
  const [searchTerm, setSearchTerm] = useState(""); // for searching playlists
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Favorites", songs: 12, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Workout Mix", songs: 20, cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Chill Vibes", songs: 15, cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Evening Jazz", songs: 9, cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Focus Beats", songs: 18, cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" },
  ]);

  // -------------------------------
  // Playlist helper
  // -------------------------------
  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------
  // State variables for songs
  // -------------------------------
  const [songs, setSongs] = useState([]); // stores songs fetched from backend
  const [loadingSongs, setLoadingSongs] = useState(true); // loading indicator
  const [songError, setSongsError] = useState(null); // error messages

  // Editing / adding state
  const [editingSongId, setEditingSongId] = useState(null); // song currently being edited
  const [newTitle, setNewTitle] = useState(""); // temporary title input
  const [newArtist, setNewArtist] = useState(""); // text input for artist names
  const [newAlbum, setNewAlbum] = useState(""); // temporary album input
  const [newDuration, setNewDuration] = useState(""); // temporary duration input
  const [newGenre, setNewGenre] = useState(""); // temporary genre input
  const [viewingSong, SetViewingSong] = useState(null); //rerenders page when you want to view

  // -------------------------------
  // Fetch songs from backend
  // -------------------------------
  const fetchSongs = () => {
    setLoadingSongs(true);
    fetch("http://localhost:5000/api/songs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch songs");
        return res.json();
      })
      .then((data) => {
        setSongs(data);
        setLoadingSongs(false);
      })
      .catch((err) => {
        setSongsError(err.message);
        setLoadingSongs(false);
      });
  };

  useEffect(() => {
    fetchSongs(); // fetch songs on mount
  }, []);

  // -------------------------------
  // Handlers for song CRUD
  // -------------------------------

  // Start editing a song
  const handleEditSong = (song) => {
    setEditingSongId(song.id);
    setNewTitle(song.title);
    setNewArtist(song.artist || ""); // set artist name string
    setNewAlbum(song.album || "");
    setNewDuration(song.duration || "");
    setNewGenre(song.genre || "");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingSongId(null);
    setNewTitle("");
    setNewArtist("");
    setNewAlbum("");
    setNewDuration("");
    setNewGenre("");
  };

  // Update a song
  const handleUpdateSong = (id) => {
    fetch(`http://localhost:5000/api/songs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        artist: newArtist, // send artist name string
        album: newAlbum,
        duration: newDuration,
        genre: newGenre,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchSongs(); // refresh list
        handleCancelEdit(); // reset input fields
      });
  };

  // Delete a song
  const handleDeleteSong = (id) => {
    fetch(`http://localhost:5000/api/songs/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => fetchSongs()); // refresh list
  };

  // Add a new song
  const handleAddSong = () => {
    const artistNamesArray = newArtist.split(",").map(a => a.trim()).filter(a => a);

    fetch("http://localhost:5000/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        album: newAlbum,
        duration: newDuration,
        genre: newGenre,
        artistNames: artistNamesArray, // send array of artist names
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchSongs(); // refresh list
        handleCancelEdit(); // clear input boxes
      });
  };

  //View Song Details
  const handleViewSong = song => {
    SetViewingSong(song);
  }



  // -------------------------------
  // Render JSX
  // -------------------------------
  return (
    <div className="library-page">
      <header className="library-header">
        <h1>🎵 <span>Your Library</span></h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* Playlists Section */}
      <section className="playlist-grid">
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <div className="cover-container">
                <img src={playlist.cover} alt={playlist.name} className="playlist-cover" />
                <button className="play-overlay">▶</button>
              </div>
              <div className="playlist-details">
                <h2>{playlist.name}</h2>
                <p>{playlist.songs} songs</p>
                <div className="actions">
                  <button className="view-btn">View</button>
                  <button className="delete-btn" onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No playlists found.</p>
        )}
      </section>

      {/* Songs Section */}
      <section className="all-songs">
        <h2>View Library</h2>

        {loadingSongs && <p>Loading Songs...</p>}
        {songError && <p>Error: {songError}</p>}

        {!loadingSongs && !songError && songs.length > 0 && (
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {editingSongId === song.id ? (
                  <>
                    {/* Editing inputs */}
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" />
                    <input value={newArtist} onChange={(e) => setNewArtist(e.target.value)} placeholder="Artist Name" />
                    <input value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} placeholder="Album" />
                    <input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder="Duration" />
                    <input value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="Genre" />
                    <button onClick={() => handleUpdateSong(song.id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {song.title} — <em>{song.artist}</em>
                    <button onClick={() => handleViewSong(song)}>Details</button>
                    <button onClick={() => handleEditSong(song)}>Edit</button>
                    <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Add new song inputs */}
        <div className="add-song">
          <h3>Add New Song</h3>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" />
          <input value={newArtist} onChange={(e) => setNewArtist(e.target.value)} placeholder="Artist(s) - comma separated" />
          <input value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} placeholder="Album" />
          <input value={newDuration} onChange={(e) => setNewDuration(e.target.value)} placeholder="Duration" />
          <input value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="Genre" />
          <button onClick={handleAddSong}>Add Song</button>
        </div>

        {!loadingSongs && !songError && songs.length === 0 && <p>No songs found in the database.</p>}
      </section>
        
  {viewingSong && ( //if viewing song is !null show:
  <div className="song-details-modal">
    <h3>{viewingSong.title}</h3>
    <p>Artist: {viewingSong.artist}</p>
    <p>Album: {viewingSong.album}</p>
    <p>Genre: {viewingSong.genre}</p>
    <p>Duration: {viewingSong.duration}</p>
    <button onClick={() => SetViewingSong(null)}>Close</button>
  </div>
)}
      {/* Recently played section */}
      <section className="recently-played">
        <h2>Recently Played</h2>
        <ul>
          <li><span>🌇 Sunset Drive</span> — <em>Midnight Loop</em></li>
          <li><span>🌌 Echo Dreams</span> — <em>Nova Soul</em></li>
          <li><span>🌃 Lofi Nights</span> — <em>Kairo</em></li>
        </ul>
      </section>
    </div>
  );
};

export default Library;
