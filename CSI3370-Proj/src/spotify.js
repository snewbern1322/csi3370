const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI; // was REDIRECT_URL, must match variable below
const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES ? import.meta.env.VITE_SPOTIFY_SCOPES.split(" ") : [];

const AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

/**
 * Build the Spotify login URL
 */
export const getSpotifyAuthUrl = () => {
  const authUrl = `${AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

  return authUrl;
};

/**
 * Parse the access token from URL hash after redirect
 */
export const getTokenFromUrl = () => {
  const hash = window.location.hash;
  if (!hash) return {}; // return empty object if no hash

  return hash
    .substring(1)
    .split("&")
    .reduce((acc, item) => {
      const parts = item.split("=");
      if (parts.length === 2) {
        acc[parts[0]] = parts[1];
      }
      return acc;
    }, {});
};
