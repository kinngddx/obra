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
        setError("Failed to load calls");
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

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center p-6 shadow-lg rounded-2xl bg-white">
      <h1 className="text-3xl font-bold mb-4">📊 Welcome to VoiceVault Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      {loading && <p>Loading calls...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && calls.length === 0 && <p>No calls found.</p>}

      {!loading && !error && calls.length > 0 && (
        <ul className="text-left">
          {calls.map((call) => (
            <li
              key={call._id}
              className="mb-4 p-4 border border-gray-300 rounded hover:shadow"
            >
              <p>
                <strong>Agent:</strong> {call.agent}
              </p>
              <p className="whitespace-pre-wrap">
                <strong>Transcript:</strong> {call.transcript}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(call.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/upload"
        className="inline-block mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
      >
        🎙️ Go to Upload Page
      </Link>
    </div>
  );
};

export default Dashboard;
