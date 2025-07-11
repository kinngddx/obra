import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: "#f3f4f6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>🎤 Welcome to VoiceVault</h1>
      <p style={{ marginBottom: "1rem", color: "#555" }}>Securely record and analyze your voice notes</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => navigate("/login")}
          style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{ padding: "10px 20px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Go to Signup
        </button>
      </div>
    </div>
  );
};

export default Welcome;
