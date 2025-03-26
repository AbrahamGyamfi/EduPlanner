import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../components/sidebar";

function Dashboard({ courseList = [], tasks = [] }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("firstname");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
          <div className="dashboard-main">
          <div className="dashboard-header">
            <h2>Hi,👋 {firstName}</h2>
            <p>Start your learning today.</p>
          </div>

          <div className="stats-section">
            <div className="learning-time">
              <div className="circle-chart">
                <span>2h 35m</span>
              </div>
              <p>Reading Writing - Video Assignment</p>
            </div>
            
            <div className="calendar-section">
              <h3>My Schedule</h3>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=YOUR_GOOGLE_CALENDAR_EMBED_URL"
                title="Google Calendar"
                style={{ border: 0 }}
                width="400"
                height="300"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

          <div className="courses-section">
            <h3>My Courses</h3>
            <div className="courses-list">
              {courseList.map((course, index) => (
                <div className="course-item" key={index}>
                  <span className="course-icon orange"></span>
                  <p>{course.name}</p>
                  <span className="progress">{course.docCount} slides</span>
                  <button>View Course</button>
                </div>
              ))}
            </div>
          </div>

          <div className="upcoming-tasks">
            <h3>Upcoming Tasks</h3>
            {tasks.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              tasks.map((task, index) => (
                <div className="task" key={index}>
                  <span className={`task-icon ${task.icon}`}></span>
                  <p>{task.name}</p>
                  <span className="task-time">{task.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
