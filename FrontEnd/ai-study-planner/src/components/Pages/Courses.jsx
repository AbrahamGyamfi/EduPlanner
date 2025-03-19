import React, { useState, useEffect } from "react";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  // Load courses from localStorage (so data persists)
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    if (savedCourses) setCourses(savedCourses);
  }, []);

  // Save courses to localStorage on update
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    slides: 0,
    progress: 0,
    status: "In Progress",
    color: "#1E88E5",
  });

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (newCourse.name.trim() === "" || newCourse.slides <= 0) {
      alert("Please enter valid course details!");
      return;
    }

    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setNewCourse({ name: "", slides: 0, progress: 0, status: "In Progress", color: "#1E88E5" });
  };

  return (
    <div className="courses-container">
      <h2>My Courses</h2>

      {/* Add Course Form */}
      <div className="add-course-form">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="slides"
          placeholder="Number of Slides"
          value={newCourse.slides}
          onChange={handleInputChange}
        />
        <button onClick={addCourse}>➕ Add Course</button>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.length === 0 ? (
          <p>No courses added yet. Add one above!</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-icon" style={{ backgroundColor: course.color }}></div>
              <h3>{course.name}</h3>
              <p>{course.slides} Slides</p>
              <p className={course.status === "Completed" ? "completed" : "in-progress"}>
                {course.status}
              </p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
