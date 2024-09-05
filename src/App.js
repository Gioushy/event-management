import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";
import EventList from "./components/EventList";
import EventCreationForm from "./components/EventCreationForm";
import EventDetails from "./components/EventDetails";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <nav className="bg-indigo-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Event Hub
            </Link>
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white mr-4 border-b-2 border-white"
                    : "text-white mr-4 hover:text-indigo-200"
                }
                end
              >
                Events
              </NavLink>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-indigo-600 px-4 py-2 rounded"
                    : "bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-400"
                }
              >
                Create Event
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/create" element={<EventCreationForm />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
