import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>Home</Link>
        <Link to="/login" style={{ margin: '0 10px', textDecoration: 'none' }}>Login</Link>
        <Link to="/signup" style={{ margin: '0 10px', textDecoration: 'none' }}>Sign Up</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to VoiceVault</h1>
            <div style={{ marginTop: '30px' }}>
              <Link to="/login">
                <button style={{ 
                  margin: '10px', 
                  padding: '15px 30px', 
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button style={{ 
                  margin: '10px', 
                  padding: '15px 30px', 
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </div>
  );
};

export default App;