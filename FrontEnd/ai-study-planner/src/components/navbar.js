import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added
import "./navbar.css";

const Navbar = () => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    const storedName = localStorage.getItem("firstname");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  return (
    <div className="navbar">
      <div className="user-profile" onClick={() => navigate("/profile")} style={{ display: "flex", alignItems: "center" }}>
        <div className="user-icon" style={{ background: "linear-gradient(135deg, #16694a, #34495e)", color: "white", borderRadius: "50%", padding: "5px", marginRight: "10px" }}>
          {firstName ? firstName.charAt(0).toUpperCase() : "?"}
        </div>
        <div>{firstName}</div>
      </div>
    </div>
  );
};

export default Navbar;
