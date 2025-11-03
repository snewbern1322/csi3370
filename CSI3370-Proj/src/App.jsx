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

import { useContext } from "react";
import { UserContext } from "./UserContext";

function App() {
  const { user } = useContext(UserContext); // ✅ get current user

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <Header user={user} />

        {/* Page content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/shareplay" element={<SharePlay />} />

            {/* Protected routes */}
            <Route path="/account" element={user ? <Account /> : <Navigate to="/login" replace />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Music control bar */}
        {user && <MusicControlBar />}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
