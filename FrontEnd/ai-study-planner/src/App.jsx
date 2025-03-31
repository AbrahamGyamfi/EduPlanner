import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Dashboard from "./components/Pages/Dashboard";
import Courses from "./components/Pages/Courses";
import Schedule from "./components/Pages/Schedules";
import Profile from "./components/Pages/Profile";
import Settings from "./components/Pages/Settings";
import CourseDetails from "./Pages/CourseDetails"; // Ensure correct import path

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleSignup = () => setIsAuthenticated(true);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard tasks={tasks} /> : <Navigate to="/" />} />
        <Route path="/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/" />} />
        <Route path="/schedule" element={isAuthenticated ? <Schedule tasks={tasks} setTasks={setTasks} /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
        <Route path="/course/:courseName" element={<CourseDetails />} />
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
