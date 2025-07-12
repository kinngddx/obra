// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Auth/Signup";
// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/Dashboard";
// import Upload from "./pages/Upload";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome"; // ✅ this must match filename exactly

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
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
    </Routes>
  );
};

export default App;
