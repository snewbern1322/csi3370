// src/spotifyApi.js
export const BASE_URL = "https://api.spotify.com/v1";

/**
 * Generic fetch with Spotify token
 */
export const spotifyFetch = async (endpoint, token) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

/**
 * Example: search for tracks
 */
export const searchTracks = async (query, token) => {
  return spotifyFetch(`/search?q=${encodeURIComponent(query)}&type=track&limit=10`, token);
};

/**
 * Example: get an album
 */
export const getAlbum = async (id, token) => {
  return spotifyFetch(`/albums/${id}`, token);
};
