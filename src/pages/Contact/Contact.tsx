import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const Contact: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Name must be at least 2 characters long")
        .required("Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      subject: yup.string().required("Subject is required"),
      message: yup
        .string()
        .min(10, "Message must be at least 10 characters long")
        .required("Message is required"),
    }),
    onSubmit: (values) => {
      setMessage("Thank you for reaching out! We'll get back to you soon.");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    },
  });
  return (
    <div className="container mx-auto my-4 p-6 rounded-md shadow-md bg-light-secondary dark:bg-dark-secondary">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">
        We’d love to hear from you! Whether you have a question, feedback, or
        just want to say hello, feel free to reach out. Please fill out the form
        below, and we’ll get back to you as soon as possible.
      </p>
      <div className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md p-6 mb-6">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 w-full max-w-xl mx-auto"
          aria-label="Contact form title">
          <div>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Name"
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.subject}
              </div>
            ) : null}
          </div>
          <div>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              rows={4}
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            aria-label="Submit contact form"
            className="bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main max-w-xs self-center mt-4">
            Submit
          </button>
        </form>
        {message && <div className="text-green-500 mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default Contact;
