import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Add a home route for testing */}
      <Route path="/" element={<div><h1>Welcome to My App</h1><p>Navigate to /login or /signup</p></div>} />
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
      {/* Catch all route for 404 */}
      <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
    </Routes>
  );
}

export default App;