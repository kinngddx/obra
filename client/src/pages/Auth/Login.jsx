import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6366F1, #8B5CF6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#4F46E5", fontSize: "1.5rem" }}>
          🎤 Login to <span style={{ color: "#8B5CF6" }}>VoiceVault</span>
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", color: "#374151" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              fontSize: "1rem",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #8B5CF6")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", color: "#374151" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              fontSize: "1rem",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #8B5CF6")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4F46E5",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center", color: "#6B7280" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#8B5CF6",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
