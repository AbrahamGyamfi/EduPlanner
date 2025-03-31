import React, { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import "./Signup.css";
 import {
   FaEnvelope,
   FaEye,
   FaEyeSlash,
   FaUser,
   FaIdCard,
   FaLock,
 } from "react-icons/fa";
 
 const Signup = ({ onSignup }) => {
   const [passwordVisible, setPasswordVisible] = useState(false);
   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
     firstname: "",
     lastname: "",
     studentId: "",
     email: "",
     password: "",
     confirmPassword: "",
   });
   const [error, setError] = useState("");
   const navigate = useNavigate();
 
   // Handle input changes
   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   // Handle form submission
   const handleSubmit = async (event) => {
     event.preventDefault();
     setError("");
 
     if (formData.password !== formData.confirmPassword) {
       setError("Passwords do not match.");
       return;
     }
 
     setLoading(true);
     try {
       const response = await fetch("http://127.0.0.1:5000/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           firstname: formData.firstname,
           lastname: formData.lastname,
           studentId: formData.studentId,
           email: formData.email,
           password: formData.password,
         }),
       });
 
       const data = await response.json();
       if (response.ok) {
         onSignup?.();
         navigate("/dashboard");
       } else {
         setError(data.error || "Signup failed. Try again.");
       }
     } catch (error) {
       setError("Error connecting to server.");
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="signup-container">
       {/* Left Section */}
       <div className="left-section">
         <h1 className="logo">📚 EduPlanner</h1>
         <div className="image-container">
           <img
             src="https://media.istockphoto.com/id/2161861047/photo/happy-male-university-student-with-backpack-and-books-in-beige-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=uzQTDO4R01Zq8lkEFhwMNcaRH2SVzODLOyLymveB1Dg="
             alt="Student"
             className="student-image"
           />
         </div>
       </div>
 
       {/* Right Section */}
       <div className="right-section">
         <div className="form-box">
           <h2>Let's Get Started 🚀</h2>
           <p>Sign up your account</p>
           {error && <p className="error-message">{error}</p>}
 
           <form onSubmit={handleSubmit}>
             {/* First Name */}
             <div className="input-group">
               <FaUser className="input-icon" />
               <input
                 type="text"
                 name="firstname"
                 placeholder="First Name"
                 value={formData.firstname}
                 onChange={handleChange}
                 required
               />
             </div>
 
             {/* Last Name */}
             <div className="input-group">
               <FaUser className="input-icon" />
               <input
                 type="text"
                 name="lastname"
                 placeholder="Last Name"
                 value={formData.lastname}
                 onChange={handleChange}
                 required
               />
             </div>
 
             {/* Student ID */}
             <div className="input-group">
               <FaIdCard className="input-icon" />
               <input
                 type="text"
                 name="studentId"
                 placeholder="Student ID"
                 value={formData.studentId}
                 onChange={handleChange}
                 required
               />
             </div>
 
             {/* Email */}
             <div className="input-group">
               <FaEnvelope className="input-icon" />
               <input
                 type="email"
                 name="email"
                 placeholder="Enter your email"
                 value={formData.email}
                 onChange={handleChange}
                 required
               />
             </div>
 
             {/* Password */}
             <div className="input-group">
               <FaLock className="input-icon" />
               <input
                 type={passwordVisible ? "text" : "password"}
                 name="password"
                 placeholder="Enter your password"
                 value={formData.password}
                 onChange={handleChange}
                 required
               />
               <span
                 className="input-icon eye-icon"
                 onClick={() => setPasswordVisible(!passwordVisible)}
               >
                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
               </span>
             </div>
 
             {/* Confirm Password */}
             <div className="input-group">
               <FaLock className="input-icon" />
               <input
                 type={confirmPasswordVisible ? "text" : "password"}
                 name="confirmPassword"
                 placeholder="Confirm password"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 required
               />
               <span
                 className="input-icon eye-icon"
                 onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
               >
                 {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
               </span>
             </div>
 
             <button type="submit" className="continue-btn" disabled={loading}>
               {loading ? "Signing up..." : "Continue"}
             </button>
           </form>
 
           <p className="terms">
             By continuing, you agree to our{" "}
             <span className="link">Terms & Conditions</span> and{" "}
             <span className="link">Privacy Policy</span>.
           </p>
 
           <button
             type="button"
             className="login-btn"
             onClick={() => navigate("/login")}
           >
             Already have an account? Log in
           </button>
         </div>
       </div>
     </div>
   );
 };
 
 export default Signup;