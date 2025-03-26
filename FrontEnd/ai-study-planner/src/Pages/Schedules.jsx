import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Schedule.css"; // Import styles

// 🔹 Google API Credentials
const API_KEY = "AIzaSyAXvy-ewemtYaO4cKoLBTObz693NoACPw4"; // Replace with your API Key
const CALENDAR_ID = "6bd3b88cfa9d9f94c508f85e3939a7229b7a9d43d224d195f6b042867603da5f@group.calendar.google.com"; // Your Public Calendar ID
const TIMEZONE = "Africa/Accra"; // Adjust to your time zone

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 Fetch events from Google Calendar API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
      );

      const googleEvents = response.data.items.map((event) => ({
        id: event.id,
        title: event.summary || "No Title",
        startTime: event.start.dateTime || event.start.date,
        endTime: event.end.dateTime || event.end.date,
      }));

      setEvents(googleEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // 🔹 Handle user input for new event
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // 🔹 Add new event to Google Calendar
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const event = {
      summary: newEvent.title,
      start: {
        dateTime: `${newEvent.date}T${newEvent.startTime}:00`,
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: `${newEvent.date}T${newEvent.endTime}:00`,
        timeZone: TIMEZONE,
      },
    };

    try {
      await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`,
        event,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Event added successfully!");
      fetchEvents(); // Refresh events after adding
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="container">
      <h2>📅 My Schedule</h2>

      {/* Google Calendar Embed */}
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${CALENDAR_ID}&ctz=${TIMEZONE}`}
        className="iframe"
        title="Google Calendar"
      ></iframe>

      {/* Task List */}
      <div className="taskContainer">
        <h3>Upcoming Events</h3>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="taskItem">
              <strong>{event.title}</strong>
              <p>{event.startTime} - {event.endTime}</p>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* Add New Task Section */}
      <div className="addTaskContainer">
        <h3>➕ Add New Task</h3>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          className="input"
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="input"
        />
        <input
          type="time"
          name="startTime"
          value={newEvent.startTime}
          onChange={handleChange}
          className="input"
        />
        <input
          type="time"
          name="endTime"
          value={newEvent.endTime}
          onChange={handleChange}
          className="input"
        />
        <button className="addButton" onClick={addEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default Schedule;
