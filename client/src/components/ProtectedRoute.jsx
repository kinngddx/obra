// // import { Navigate } from "react-router-dom";
// // import { useAuth } from "../contexts/AuthContext";

// // const ProtectedRoute = ({ children }) => {
// //   const { user } = useAuth();

// //   if (!user) {
// //     // If not logged in, redirect to login page
// //     return <Navigate to="/login" replace />;
// //   }

// //   // Else show the protected component
// //   return children;
// // };

// // export default ProtectedRoute;


// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;

// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;