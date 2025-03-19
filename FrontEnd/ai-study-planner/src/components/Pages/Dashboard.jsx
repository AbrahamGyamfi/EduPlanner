import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../sidebar";


const Dashboard = () => {
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
            <div className="activity-chart">
              <p>My Activity</p>
              <img src="activity-chart.png" alt="Activity Graph" />
            </div>
          </div>

          <div className="courses-section">
            <h3>My Courses</h3>
            <div className="courses-list">
              <div className="course-item">
                <span className="course-icon orange"></span>
                <p>Data Communication</p>
                <span className="progress">25%</span>
                <button>View Course</button>
              </div>
              <div className="course-item">
                <span className="course-icon blue"></span>
                <p>Operating Systems</p>
                <span className="progress">25%</span>
                <button>View Course</button>
              </div>
              <div className="course-item">
                <span className="course-icon red"></span>
                <p>Graph Theory</p>
                <span className="progress">25%</span>
                <button>View Course</button>
              </div>
            </div>
          </div>

          <div className="upcoming-tasks">
            <h3>Upcoming Tasks</h3>
            <div className="task">
              <span className="task-icon purple"></span>
              <p>Group Discussion</p>
              <span className="task-time">08:00AM - 15:00PM</span>
            </div>
            <div className="task">
              <span className="task-icon green"></span>
              <p>Graph Theory Assignment</p>
              <span className="task-time">08:00AM - 15:00PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
