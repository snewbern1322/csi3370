import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicControlBar from "./components/MusicControlBar";
import Library from "./pages/Library";
import Search from "./pages/Search";
import SharePlay from "./pages/SharePlay";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
            {!token && <Route path="/login" element={<Login />} />}
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/shareplay" element={<SharePlay />} />
          </Routes>
        </main>

        {/* Music control bar */}
        {token && <MusicControlBar />}

        {/* Optional footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
