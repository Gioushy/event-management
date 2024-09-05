import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      // Retrieve events from local storage
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

      try {
        // Fetch events from PredictHQ API
        const response = await fetch(
          "https://api.predicthq.com/v1/events/?country=EG&limit=10",
          {
            headers: {
              Authorization: "Bearer P43eWcmlMh6hgYo88vG2mbKm3cv37taJtJToakKI", // Replace with your actual API key
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // Transform API data to match our event structure
        const apiEvents = data.results.map((event) => ({
          id: event.id,
          name: event.title,
          date: event.start,
          location: event.country,
          description: event.description || "No description available",
        }));

        // Store API events in local storage
        const allEvents = [...storedEvents, ...apiEvents];
        localStorage.setItem("events", JSON.stringify(allEvents));

        // Set events state
        setEvents(allEvents);
      } catch (err) {
        console.error("Error fetching API events:", err);
        setError("Failed to fetch events. Please try again later.");
        setEvents(storedEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">
        Upcoming Events in Egypt
      </h2>
      {events.length === 0 ? (
        <p className="text-center">
          No events found. Try creating a new event!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="bg-indigo-500 text-white p-4">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 mt-2">{event.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
