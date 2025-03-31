import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../components/sidebar";
// import Carousel from "../components/carousel"; // Ensure this path is correct

function Dashboard({ tasks = [] }) {
  const [firstName, setFirstName] = useState("");
  const [courseList, setCourseList] = useState([]);
  const icons = ["fas fa-book", "fas fa-chart-bar", "fas fa-laptop-code"];

  useEffect(() => {
    const storedName = localStorage.getItem("firstname");
    if (storedName) {
      setFirstName(storedName);
    }

    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      setCourseList(JSON.parse(savedCourses));
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        {/* Header Section */}
        <header className="dashboard-header">
          <h2>Hi,👋 {firstName}</h2>
          <p>Start your learning today.</p>
        </header>

        {/* <div className="carousel-section">
          <Carousel className="small-carousel" /> 
          </div> */}

        {/* Courses Section */}
        <section className="courses-section">
          <h3>My Courses</h3>
          <div className="courses-list">
            {courseList.length > 0 ? (
              courseList.map((course, index) => {
                const randomIcon = icons[index % icons.length];
                return (
                  <div className="course-item" key={index}>
                    <span className="course-icon">
                      <i className={randomIcon}></i>
                    </span>
                    <p>{course.name}</p>
                    <span className="progress">{course.docCount} slides</span>
                    <button className="view-course-btn">View Course</button>
                  </div>
                );
              })
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </section>

        {/* Upcoming Tasks Section */}
        <section className="upcoming-tasks">
          <h3>Upcoming Tasks</h3>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div className="task" key={index}>
                <span className={`task-icon ${task.icon}`}></span>
                <p>{task.name}</p>
                <span className="task-time">{task.time}</span>
              </div>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
