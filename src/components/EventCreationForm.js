import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EventSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

const EventCreationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const newEvent = {
      ...values,
      id: Date.now().toString(),
    };

    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    localStorage.setItem(
      "events",
      JSON.stringify([...existingEvents, newEvent])
    );

    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">
        Create New Event
      </h2>
      <Formik
        initialValues={{ name: "", date: "", location: "", description: "" }}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Event Name
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
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <Field
                type="date"
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <Field
                type="text"
                name="location"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Event
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventCreationForm;
