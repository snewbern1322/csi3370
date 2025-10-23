import React, { useState } from "react";
import { searchTracks } from "../spotifyApi";

function Search({ token }) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
  if (!query || !token) return;
  const data = await searchTracks(query, token);
  setTracks(data.tracks.items);
};

  return (
    <div>
      <h1>Search Music</h1>
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists.map((a) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
