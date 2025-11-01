// src/pages/SharePlay.jsx
import React, { useState } from "react";
import "./SharePlay.css";

const SharePlay = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "Loving this song! 🎶" },
    { id: 2, user: "Bob", text: "Vibes are immaculate 🔥" },
  ]);

  const [queue, setQueue] = useState([
    { id: 1, title: "Levitating", artist: "Dua Lipa" },
    { id: 2, title: "Save Your Tears", artist: "The Weeknd" },
  ]);

  const [participants, setParticipants] = useState(["Alice", "Bob", "Charlie"]);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: comment },
    ]);
    setComment("");
  };

  const handleAddToQueue = () => {
    const newTrack = {
      id: Date.now(),
      title: "New Song " + (queue.length + 1),
      artist: "Random Artist",
    };
    setQueue([...queue, newTrack]);
  };

  const handleReaction = (emoji) => {
    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: emoji },
    ]);
  };

  return (
    <div className="shareplay-page">
      <header className="session-header">
        <h1>🎧 SharePlay Session</h1>
        <p>
          Session Code: <strong>ABCD1234</strong>
        </p>
      </header>

      <section className="now-playing">
        <div className="album-art"></div>
        <div className="track-info">
          <h2>Now Playing</h2>
          <p><strong>Blinding Lights</strong> — The Weeknd</p>
        </div>
      </section>

      <section className="queue-section">
        <div className="queue-header">
          <h3>Up Next Queue</h3>
          <button className="add-button" onClick={handleAddToQueue}>
            + Add Song
          </button>
        </div>
        <div className="queue-list">
          {queue.map((track) => (
            <div key={track.id} className="queue-item">
              <p>
                {track.title} <span>- {track.artist}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="participants">
        <h3>Listeners</h3>
        <div className="avatars">
          {participants.map((p, index) => (
            <div key={index} className="avatar">
              {p.charAt(0)}
              <span className="username">{p}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="comments-section">
        <h3>Live Chat & Reactions</h3>
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className="comment">
              <strong>{c.user}:</strong> {c.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendComment} className="comment-form">
          <input
            type="text"
            placeholder="Send a message or reaction..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <div className="reaction-bar">
          {["🔥", "🎶", "💯", "❤️", "👏"].map((emoji) => (
            <button
              key={emoji}
              className="reaction"
              onClick={() => handleReaction(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </section>

      <footer className="footer-space"></footer>
    </div>
  );
};

export default SharePlay;
