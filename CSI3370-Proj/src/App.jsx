import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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
import { UserContext } from "./UserContext";

function App() {
  const { user } = useContext(UserContext);
  const [showPremiumNotification, setShowPremiumNotification] = useState(false);

  const triggerPremiumNotification = () => {
    setShowPremiumNotification(true);
    setTimeout(() => setShowPremiumNotification(false), 2500);
  };

  // Small wrapper component to handle redirect with notification
  const RedirectWithNotify = ({ to }) => {
    useEffect(() => {
      triggerPremiumNotification();
    }, []);
    return <Navigate to={to} replace />;
  };

  return (
    <Router>
      <div className="app">
        {/* Notification bar */}
        {showPremiumNotification && (
          <div className="notification-bar">
            Premium features require a premium account.
          </div>
        )}

        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />

            {/* SharePlay with premium check */}
            <Route
              path="/shareplay"
              element={
                user
                  ? user.user_type === "premium"
                    ? <SharePlay />
                    : <RedirectWithNotify to="/" />
                  : <RedirectWithNotify to="/login" />
              }
            />

            {/* Protected routes */}
            <Route path="/account" element={user ? <Account /> : <Navigate to="/login" replace />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" replace />} />

            {/* Catch-all */}
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
