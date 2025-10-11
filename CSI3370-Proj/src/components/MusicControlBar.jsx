import React from "react";
import "./MusicControlBar.css";

function MusicControlBar() {
  return (
    <div className="control-bar">
      <button>⏮</button>
      <button>⏯</button>
      <button>⏭</button>
      <input type="range" min="0" max="100" />
    </div>
  );
}

export default MusicControlBar;
