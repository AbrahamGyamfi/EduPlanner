import React, { useState } from "react";
import "./Schedule.css";

function Schedule({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState({ name: "", time: "", icon: "blue" });
  const [error, setError] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name || !newTask.time) {
      setError("Both task name and time are required.");
      return;
    }
    setTasks([...tasks, newTask]);
    setNewTask({ name: "", time: "", icon: "blue" });
    setError(""); // Clear error after successful addition
  };

  const handleDateChange = (e) => {
    setNewTask({ ...newTask, time: e.target.value });
  };

  return (
    <div className="schedule">
      <h2>Schedule Tasks</h2>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="date"
          value={newTask.time}
          onChange={handleDateChange}
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks scheduled</p>
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
  );
}

export default Schedule;
