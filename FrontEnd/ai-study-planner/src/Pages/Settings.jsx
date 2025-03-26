import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added import
import "./Settings.css";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    promotions: true,
    courseRecommendations: false,
    examNotices: true,
    reminders: true,
  });

  const navigate = useNavigate(); // Added navigate
  // Load saved preferences from localStorage
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("emailNotifications"));
    if (savedSettings) setEmailNotifications(savedSettings);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  // Toggle switch handler
  const handleToggle = (type) => {
    setEmailNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Added sign-out handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-menu">
        <div className="menu-item">🔧 General</div>
        <div className="menu-item">👤 User Profile</div>
        <div className="menu-item active">📧 Email Notification</div>
        <div className="menu-item">🔔 Learning Reminder</div>
      </div>

      <div className="settings-content">
        <h3>Email Notification</h3>
        <p><strong>When email me:</strong></p>

        <div className="toggle-option">
          <span>Promotion, course recommendations</span>
          <ToggleSwitch
            checked={emailNotifications.promotions}
            onChange={() => handleToggle("promotions")}
          />
        </div>

        <div className="toggle-option">
          <span>Course Recommendations</span>
          <ToggleSwitch
            checked={emailNotifications.courseRecommendations}
            onChange={() => handleToggle("courseRecommendations")}
          />
        </div>

        <div className="toggle-option">
          <span>Examination Notice</span>
          <ToggleSwitch
            checked={emailNotifications.examNotices}
            onChange={() => handleToggle("examNotices")}
          />
        </div>

        <div className="toggle-option">
          <span>Learning Reminder</span>
          <ToggleSwitch
            checked={emailNotifications.reminders}
            onChange={() => handleToggle("reminders")}
          />
        </div>

        {/* Added Sign Out button */}
        <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
};

export default Settings;
