import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size > 10 * 1024 * 1024) {
      setMessage('📦 File too big! Max 10MB please.');
      return;
    }
    setFile(selected);
    setMessage('🎧 Nice pick! File is ready for launch 🚀');
    setTranscript('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('🤦‍♂️ Dude… select a file first!');
      return;
    }

    // Step 3 & 4 combined: get token from localStorage and use in axios headers
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const formData = new FormData();
    formData.append('audio', file);

    setLoading(true);
    setMessage('🔮 Casting transcription spells... please wait!');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTranscript(res.data.transcript);
      setMessage('🎉 Woohoo! Transcript is ready, genius 🧠');
    } catch (err) {
      setMessage(
        err.response?.data?.message || '💥 Upload exploded. Blame the gremlins!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          🎙️ Voice Upload Zone
        </h2>

        <input
          type="file"
          accept=".mp3,.wav"
          onChange={handleFileChange}
          className="w-full mb-4 border p-2 rounded text-sm"
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
          } text-white transition duration-300 mb-4 flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Transcribing magic... ✨
            </>
          ) : (
            '🧠 Start Transcribing'
          )}
        </button>

        {message && (
          <p className="text-center text-sm font-medium text-purple-800 mb-4 animate-pulse">
            {message}
          </p>
        )}

        {transcript && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-gray-800 whitespace-pre-wrap text-sm max-h-60 overflow-y-auto">
            <p className="font-semibold mb-2">📜 Transcript:</p>
            {transcript}
          </div>
        )}
      </form>
    </div>
  );
};

export default Upload;
