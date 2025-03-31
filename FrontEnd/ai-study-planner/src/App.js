import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Schedule from "./Pages/Schedules";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import CoursesPage from "./Pages/CoursesPage";
import CourseDetail from "./Pages/CourseDetails";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleSignup = () => setIsAuthenticated(true);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/Courses" element={isAuthenticated ? <CoursesPage/> : <Navigate to="/" />} />
        <Route path="/course/:courseName" element={isAuthenticated ? <CourseDetail /> : <Navigate to="/" />} />
        <Route path="/schedule" element={isAuthenticated ? <Schedule /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
        
      </Routes>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
