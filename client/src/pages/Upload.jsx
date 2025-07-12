import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("📂 Pick a file first, my friend. I'm not a mind reader 😅");
      return;
    }

    const formData = new FormData();
    formData.append("audio", selectedFile);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const successMessages = [
        "✅ Boom! File uploaded like a champ. 🏆 Transcript cooking...",
        "🎉 Nailed it! Audio uploaded. Sit back and relax 😎",
        "🚀 Whoosh! File’s flying through the internet.",
        "🔥 That upload was smoother than butter on toast.",
      ];
      setMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
    } catch (err) {
      setMessage("❌ Uh-oh! That didn’t go as planned. 🧨 Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
          🎙️ Upload Audio File
        </h2>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{
            marginBottom: "1.5rem",
            background: "#1f2937",
            padding: "12px",
            border: "1px solid #4b5563",
            color: "#f9fafb",
            borderRadius: "10px",
            width: "100%",
            cursor: "pointer",
          }}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            backgroundColor: "#8b5cf6",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.3s ease",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Uploading..." : "🚀 Upload"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "1.5rem",
              fontWeight: "500",
              color: "#facc15",
              fontSize: "1rem",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
