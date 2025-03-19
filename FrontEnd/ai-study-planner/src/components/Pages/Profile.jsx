import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  // State to hold profile details
  const [profile, setProfile] = useState({
    fullName: "Abena Nketisiah",
    email: "abenanketisiah@gmail.com",
    college: "College of Science",
    department: "Computer Science",
    year: "200",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load saved profile from localStorage (if available)
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  // Save profile to localStorage when updated
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  // Handle input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle save and cancel
  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) setProfile(savedProfile);
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <div className="profile-info">
        <div className="profile-avatar">
          <span>{profile.fullName[0]}</span>
        </div>

        <div className="profile-stats">
          <p><strong>Courses in Progress:</strong> 8</p>
          <p><strong>Courses Completed:</strong> 23</p>
        </div>
      </div>

      <div className="profile-form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          disabled
        />

        <label>College</label>
        <input
          type="text"
          name="college"
          value={profile.college}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          value={profile.department}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Year</label>
        <input
          type="text"
          name="year"
          value={profile.year}
          onChange={handleChange}
          disabled={!isEditing}
        />

        {isEditing ? (
          <div className="profile-buttons">
            <button className="save" onClick={handleSave}>Save Profile</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className="edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
