import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = () => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const foundEvent = storedEvents.find((e) => e.id === id);

      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setError("Event not found");
      }

      // Check if user is already registered
      const registrations =
        JSON.parse(localStorage.getItem("registrations")) || {};
      setIsRegistered(!!registrations[id]);
      setLoading(false);
    };

    fetchEventDetails();
  }, [id]);

  const handleRegistration = (values, { setSubmitting }) => {
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || {};
    registrations[id] = values;
    localStorage.setItem("registrations", JSON.stringify(registrations));
    setIsRegistered(true);
    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading event details...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Events
        </button>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center mt-8">Event not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-indigo-500 text-white p-4">
        <h2 className="text-3xl font-bold">{event.name}</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Location:</span> {event.location}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Description:</span>
        </p>
        <p className="mt-2">{event.description}</p>

        {isRegistered ? (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            You are registered for this event!
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">
              Register for this event
            </h3>
            <Formik
              initialValues={{ name: "", email: "" }}
              validationSchema={RegistrationSchema}
              onSubmit={handleRegistration}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
