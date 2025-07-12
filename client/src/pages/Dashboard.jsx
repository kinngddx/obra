import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const token = user?.token;
        const res = await axios.get("http://localhost:5000/api/calls", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCalls(res.data);
      } catch (err) {
        setError("❌ Failed to load calls.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p style={{ color: "#fff" }}>Loading user...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>📊 VoiceVault Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            🔒 Logout
          </button>
        </div>

        {loading && <p>🔄 Loading calls...</p>}
        {error && <p style={{ color: "#f87171" }}>{error}</p>}
        {!loading && !error && calls.length === 0 && <p>😶 No calls found yet.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {calls.map((call) => (
            <div
              key={call._id}
              style={{
                padding: "1.5rem",
                border: "1px solid #4b5563",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <p><strong>👤 Agent:</strong> {call.agent}</p>
              <p style={{ margin: "1rem 0", whiteSpace: "pre-wrap" }}>
                <strong>📝 Transcript:</strong> {call.transcript}
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                ⏰ {new Date(call.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            to="/upload"
            style={{
              backgroundColor: "#8b5cf6",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
          >
            🎙️ Upload More Audio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
