import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: "Data Comm Class", time: "07:00 - 08:00 AM", color: "green" },
    { id: 2, title: "Graph Theory Class", time: "1:00 PM - 3:00 PM", color: "red" },
    { id: 3, title: "DevOps Practice", time: "07:00 - 08:00 AM", color: "blue" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");

  // Handle adding new task
  const addTask = () => {
    if (newTask && newTime) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, time: newTime, color: "purple" }]);
      setNewTask("");
      setNewTime("");
    }
  };

  return (
    <div className="schedule-container">
      <h2>Schedule</h2>

      <div className="calendar-section">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      <div className="tasks-section">
        <h3>Tasks for {selectedDate.toDateString()}</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ backgroundColor: task.color }}>
              {task.title} - {task.time}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-task">
        <input type="text" placeholder="Task Name" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <input type="text" placeholder="Time (e.g., 10:00 AM - 11:00 AM)" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
        <button onClick={addTask}>+ Add New Task</button>
      </div>
    </div>
  );
};

export default Schedule;
