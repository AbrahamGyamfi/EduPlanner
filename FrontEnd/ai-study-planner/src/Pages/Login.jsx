import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Data: ", data);

      // Check for success in the response
      if (response.ok && data.status === "success") {
        // Store firstname in localStorage
        localStorage.setItem("firstname", data.user.firstname);
        // Call onLogin if provided
        onLogin?.();
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed. Check your credentials.");
      }
    } catch (error) {
      setError("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1 className="logo">📚 EduPlanner</h1>
        <div className="image-container">
          <img
            src="https://thumbs.dreamstime.com/b/portrait-happy-female-african-american-college-student-237737919.jpg"
            alt="Student"
            className="student-image"
          />
        </div>
      </div>

      <div className="right-section">
        <div className="form-box">
          <h2>Welcome back 👋</h2>
          <p>Log in to your account</p>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="What is your e-mail?"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-icon eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="remember-forgot">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="continue-btn" disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
