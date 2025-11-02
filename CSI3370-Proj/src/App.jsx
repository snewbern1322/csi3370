import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicControlBar from "./components/MusicControlBar";
import Library from "./pages/Library";
import Search from "./pages/Search";
import SharePlay from "./pages/SharePlay";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import "./App.css";

import { useEffect, useState } from "react";
import { getTokenFromUrl } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <Header token={token} />

        {/* Page content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/shareplay" element={<SharePlay />} />

            {/* Protected routes */}
            <Route
              path="/account"
              element={token ? <Account /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/settings"
              element={token ? <Settings /> : <Navigate to="/login" replace />}
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Music control bar */}
        {token && <MusicControlBar />}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
