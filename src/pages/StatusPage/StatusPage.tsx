import { useState } from "react";
import {
  incidents,
  recentReleases,
  Release,
  upcomingReleases,
} from "../../data/statusData";
import { useFormik } from "formik";
import * as yup from "yup";

const StatusPage: React.FC = () => {
  const [status] = useState<string>("Operational");
  const [message, setMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Required"),
    }),
    onSubmit: (values) => {
      setMessage(
        "Thank you for subscribing! We will notify you of any updates."
      );
      setTimeout(() => {
        setMessage("");
      }, 5000);
    },
  });

  return (
    <div className="container mx-auto my-4 rounded-md p-6 bg-light-secondary dark:bg-dark-secondary">
      <h1 className="text-3xl font-bold mb-4">System Status</h1>
      <div className="relative flex flex-col md:flex-row justify-between items-center bg-light-primary dark:bg-dark-primary rounded-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">
          Subscribe for Updates
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            aria-label="Subscribe for updates"
            className="max-h-10 transform duration-300 bg-light-button-main hover:bg-light-button-hover px-4 py-2 rounded-md text-dark-text-main">
            Subscribe
          </button>
        </form>
        {message && (
          <div className="text-green-500 mt-4 md:mt-0">{message}</div>
        )}
      </div>
      <div className="container bg-light-primary dark:bg-dark-primary rounded-md shadow-md space-y-4 p-2 md:p-6">
        <h2
          className={`${
            status === "Operational" ? "bg-green-500" : "bg-red-500"
          } text-xl font-semibold text-left p-6 text-dark-text-main  w-full rounded-md shadow-md`}>
          Current Status: {status}
        </h2>

        <section className="space-y-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md mx-4 p-6">
          <h2 className="text-lg font-semibold">Upcoming Releases</h2>
          <ul className="space-y-4">
            {upcomingReleases.map((release: Release, index) => (
              <li
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] lg:grid-cols-[1fr_1fr_3fr] gap-4 items-center text-start border rounded-md p-2 md:p-4 shadow-sm transition-bg duration-300 hover:bg-light-primary dark:hover:bg-dark-primary text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <p>Date: {release.date}</p>
                <p>Version:{release.version}</p>
                <p>Description: {release.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md mx-4 p-6">
          <h2 className="text-lg font-semibold">Recent Releases</h2>
          <ul className="space-y-4">
            {recentReleases.map((release: Release, index) => (
              <li
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] lg:grid-cols-[1fr_1fr_3fr] gap-4 items-center text-start border rounded-md p-4 shadow-sm transition-bg duration-300 hover:bg-light-primary dark:hover:bg-dark-primary text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <p>Date: {release.date}</p>
                <p>Version: {release.version}</p>
                <p>Description: {release.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md mx-4 p-6">
          <h2 className="text-lg font-semibold">Incident History</h2>
          <ul className="space-y-4">
            {incidents.map((incedent, index) => (
              <li
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr_2fr] gap-4 items-center text-start border rounded-md p-4 shadow-sm transition-bg duration-300 hover:bg-light-primary dark:hover:bg-dark-primary text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <p>Date: {incedent.date}</p>
                <p>Description: {incedent.description}</p>
                <p>Resolution: {incedent.resolution}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default StatusPage;
