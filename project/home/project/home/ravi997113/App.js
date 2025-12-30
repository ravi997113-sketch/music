import { useState, useRef } from "react";
import "./styles.css";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Download,
  MoreVertical,
  FileText,
} from "lucide-react";

export default function App() {
  const audioRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  /* ---------------- LOGIN PAGE ---------------- */
  if (!isLoggedIn) {
    return (
      <div className="center">
        <div className="card">
          <div className="title">Login to Music App</div>

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="button"
            onClick={() => {
              if (email === "" || password === "") {
                setError("Please fill email and password");
              } else {
                setError("");
                setIsLoggedIn(true);
              }
            }}
          >
            Login
          </button>

          {error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  }

  /* ---------------- MUSIC PLAYER PAGE ---------------- */
  return (
    <div className="center">
      <div className="card">
        {/* Header */}
        <div className="header">
          <strong>🎵 My Music Player</strong>

          <div className="menuBox">
            <button className="iconBtn" onClick={() => setShowMenu(!showMenu)}>
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="menu">
                <div className="menuItem">
                  <Download size={14} /> Download
                </div>
                <div className="menuTitle">Lyrics</div>
                <div className="menuItem">
                  <FileText size={14} /> English
                </div>
                <div className="menuItem">
                  <FileText size={14} /> Hindi
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />

        {/* Album Cover */}
        <div className="album">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
            alt="Album Cover"
          />
        </div>
        {/* Upload Song */}
        <input
          id="songUpload"
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && audioRef.current) {
              audioRef.current.pause();
              audioRef.current.src = URL.createObjectURL(file);
              audioRef.current.play();
              setIsPlaying(true);
            }
          }}
        />

        <label htmlFor="songUpload" className="button">
          Add Song
        </label>

        {/* Song Info */}
        <div className="songInfo">
          <strong>Song Title</strong>
          <div className="artist">Artist Name</div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="iconBtn">
            <Shuffle />
          </button>

          <button className="iconBtn">
            <SkipBack />
          </button>

          <button
            className="playBtn"
            onClick={() => {
              if (!audioRef.current) return;

              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
              }

              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button className="iconBtn">
            <SkipForward />
          </button>
        </div>
      </div>
    </div>
  );
}
