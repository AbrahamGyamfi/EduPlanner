import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { courseName } = useParams();
  const [slides, setSlides] = useState(() => {
    const savedSlides = localStorage.getItem(`slides-${courseName}`);
    return savedSlides ? JSON.parse(savedSlides) : [];
  });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [summary, setSummary] = useState(""); // New state for summary
  const [resources, setResources] = useState([]); // New state for resources
  const [loading, setLoading] = useState({
    quiz: false,
    summary: false,
    resources: false,
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSlide = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      const updatedSlides = [...slides, newSlide];
      setSlides(updatedSlides);
      localStorage.setItem(`slides-${courseName}`, JSON.stringify(updatedSlides));
    }
  };

  const handleDeleteSlide = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this slide?");
    if (confirmDelete) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      localStorage.setItem(`slides-${courseName}`, JSON.stringify(updatedSlides));
    }
  };

  const handleGenerateQuiz = async () => {
    if (slides.length === 0) {
      alert("Please upload slides before generating a quiz.");
      return;
    }

    setLoading((prev) => ({ ...prev, quiz: true }));
    try {
      const response = await fetch("http://localhost:5000/generate-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      const data = await response.json();
      setQuizQuestions(data.questions || []); // Ensure questions are properly set
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again later.");
    } finally {
      setLoading((prev) => ({ ...prev, quiz: false }));
    }
  };

  const handleGenerateSummary = async () => {
    if (slides.length === 0) {
      alert("Please upload slides before generating a summary.");
      return;
    }

    setLoading((prev) => ({ ...prev, summary: true }));
    try {
      const response = await fetch("http://localhost:5000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      const data = await response.json();
      setSummary(data.summary || "No summary available."); // Ensure summary is properly set
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please try again later.");
    } finally {
      setLoading((prev) => ({ ...prev, summary: false }));
    }
  };

  const handleFetchResources = async () => {
    if (slides.length === 0) {
      alert("Please upload slides before fetching resources.");
      return;
    }

    setLoading((prev) => ({ ...prev, resources: true }));
    try {
      const response = await fetch("http://localhost:5000/fetch-resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      const data = await response.json();
      setResources(data.resources || []); // Ensure resources are properly set
    } catch (error) {
      console.error("Error fetching resources:", error);
      alert("Failed to fetch resources. Please try again later.");
    } finally {
      setLoading((prev) => ({ ...prev, resources: false }));
    }
  };

  useEffect(() => {
    document.title = `Course Details - ${decodeURIComponent(courseName)}`;
  }, [courseName]);

  return (
    <div className="course-detail">
      <h2>📚 {decodeURIComponent(courseName)} - Course Details</h2>

      {/* Upload Section */}
      <div className="upload-section">
        <div
          className="drag-drop-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              handleFileUpload({ target: { files: [file] } });
            }
          }}
        >
          <p>Drag & Drop Your Files Here</p>
          <p>OR</p>
          <label htmlFor="file-upload" className="upload-btn">📂 Upload Your Slides</label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <p>Accepted formats: .pptx, .ppt, .pdf, .png, .jpg, .jpeg | Max: 20MB/file</p>
        </div>
      </div>

      {/* Slides List */}
      <div className="slides-list">
        <h3>📜 Uploaded Slides</h3>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div className="slide-item" key={index}>
              <p>{slide.name}</p>
              <div>
                <a href={slide.url} target="_blank" rel="noopener noreferrer">🔗 Open</a>
                <button className="delete-btn" onClick={() => handleDeleteSlide(index)}>🗑</button>
              </div>
            </div>
          ))
        ) : (
          <p>No slides uploaded yet.</p>
        )}
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <h3>📖 Summary</h3>
        <button
          className="generate-summary-btn"
          onClick={handleGenerateSummary}
          disabled={loading.summary}
        >
          {loading.summary ? "Generating Summary..." : "Generate Summary"}
        </button>
        {summary && <p className="summary-text">{summary}</p>}
      </div>

      {/* Related Resources Section */}
      <div className="resources-section">
        <h3>🔗 Related Resources</h3>
        <button
          className="fetch-resources-btn"
          onClick={handleFetchResources}
          disabled={loading.resources}
        >
          {loading.resources ? "Fetching Resources..." : "Find Resources"}
        </button>
        {resources.length > 0 && (
          <ul className="resources-list">
            {resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quiz Section */}
      <div className="quiz-section">
        <h3>📝 Quiz</h3>
        <button className="generate-quiz-btn" onClick={handleGenerateQuiz} disabled={loading.quiz}>
          {loading.quiz ? "Generating Quiz..." : "Generate Quiz"}
        </button>
        {quizQuestions.length > 0 && (
          <ul className="quiz-questions">
            {quizQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
