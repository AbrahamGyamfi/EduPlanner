import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const CoursesPage = ({ courses = [] }) => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState(() => {
    const saved = localStorage.getItem("courses");
    if (saved) {
      return JSON.parse(saved);
    }
    return courses.map(c => ({ ...c, docCount: c.docCount || 0 }));
  });
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const inputRef = useRef(null);

  const icons = ["fas fa-book", "fas fa-chart-bar", "fas fa-laptop-code"];

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courseList));
  }, [courseList]);

  const handleAddCourse = () => {
    const title = prompt("Enter the course title:");
    if (!title) return;

    const creditHours = prompt("Enter the number of credit hours:");
    if (!creditHours || isNaN(creditHours)) {
      alert("Please enter a valid number for credit hours.");
      return;
    }

    const newCourse = {
      name: title,
      time: new Date().toLocaleString(),
      creditHours: `${creditHours} Credits`,
      docCount: 0
    };

    setCourseList([...courseList, newCourse]);
  };

  function handleCourseCardClick(index) {
    alert(`Please upload slides for: ${courseList[index].name}`);
    setSelectedCourseIndex(index);
    inputRef.current?.click();
  }

  function handleFileUpload(event) {
    if (event.target.files && event.target.files[0] && selectedCourseIndex != null) {
      alert(`You chose file: ${event.target.files[0].name}`);
      setCourseList(prev => {
        const updated = [...prev];
        updated[selectedCourseIndex].docCount += 1;
        return updated;
      });
    }
  }

  return (
    <div className="courses-page1">
      <h2 className="heading">
        <button onClick={() => navigate("/dashboard")}>Back</button>Courses Page
      </h2>
      <div className="add-course-card" onClick={handleAddCourse}>
        <div className="icon-container">
        </div>
        <div className="plus-sign">+</div>
        <p>Add Course</p>
      </div>
      <div className="courses-grid">
        {courseList.map((course, index) => {
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];
          return (
            <div key={index} className="course-card" onClick={() => handleCourseCardClick(index)}>
              <div className="icon-container">
                <i className={randomIcon}></i>
              </div>
              <div className="course-card-details">
                <h1 className="course-title">{course.name}</h1>
                <p className="reg-time">Registered on: {course.time}</p>
                <p className="credit-hours">{course.creditHours}</p>
                <p className="doc-count">  {course.docCount} slides</p>
              </div>
            </div>
          );
        })}
      </div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default CoursesPage;