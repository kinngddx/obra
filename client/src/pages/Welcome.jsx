import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const taglines = [
  "Where your voice becomes data (and hopefully not embarrassing 😅)",
  "Transcribe it. Analyze it. Brag about it.",
  "We store your voice — not your secrets... or do we? 🤔",
  "Whisper to us, we whisper back. (Thanks, OpenAI!)",
  "No voice left behind 🎤💾",
];

const Welcome = () => {
  const navigate = useNavigate();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 4000); // Change tagline every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #4c1d95, #0f172a)", // deep purple to dark navy
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      {/* Top Nav */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "4rem" }}>
        <img
          src="https://img.icons8.com/color/96/microphone--v1.png" // placeholder logo
          alt="VoiceVault"
          style={{ width: "48px", height: "48px", marginRight: "12px" }}
        />
        <h2 style={{ fontWeight: "bold", fontSize: "1.6rem" }}>VoiceVault</h2>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem", textShadow: "2px 2px #00000033" }}>
          🎙️ Welcome to VoiceVault
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#e0e0e0", maxWidth: "700px", marginBottom: "1.5rem" }}>
          {taglines[taglineIndex]}
        </p>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🔐 Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#22c55e",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🚀 Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
