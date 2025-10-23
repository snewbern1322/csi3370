// src/pages/SharePlay.jsx
import React, { useState } from "react";
import "./SharePlay.css"; // Optional for styling

const SharePlay = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "Loving this song!" },
    { id: 2, user: "Bob", text: "Amazing vibes 🔥" },
  ]);

  const participants = ["Alice", "Bob", "Charlie"];

  const handleSendComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    setComments([...comments, { id: Date.now(), user: "You", text: comment }]);
    setComment("");
  };

  return (
    <div className="shareplay-page">
      <h1>SharePlay</h1>

      <div className="session-info">
        <p>Session Code: <strong>ABCD1234</strong></p>
      </div>

      <div className="now-playing">
        <h2>Now Playing</h2>
        <p>Song Title - Artist Name</p>
      </div>

      <div className="participants">
        <h3>Participants</h3>
        <ul>
          {participants.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="comments-section">
        <h3>Live Chat / Reactions</h3>
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
      </div>
    </div>
  );
};

export default SharePlay;
