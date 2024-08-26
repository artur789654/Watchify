import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const Partnership: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Required"),
      email: yup.string().email("Invalid email format").required("Required"),
      message: yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        setFormStatus("Your message has been successfully sent!");
        resetForm();
      }, 500);

      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
      console.log("form submited");
    },
  });
  return (
    <div className="container p-6 mx-auto my-4 bg-light-secondary dark:bg-dark-secondary rounded-md">
      <h1 className="text-4xl font-bold text-center mb-4">
        Partnership Opportunities
      </h1>
      <div className="bg-light-primary dark:bg-dark-primary space-y-4 rounded-md shadow-md p-4">
        <h2 className="text-2xl font-semibold">Types of Partnerships</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We are looking for strategic partners to collaborate on various
          projects...
        </p>

        <h2 className="text-2xl font-semibold">Benefits of Partnering</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Gain access to resources, expand your audience, and join forces for
          mutual success...
        </p>

        <h2 className="text-2xl font-semibold">Special Offers</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Check out our latest offers for new partners, including discounts and
          exclusive opportunities...
        </p>

        <div className="p-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md mx-auto lg:w-1/2 md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form onSubmit={formik.handleSubmit} className=" space-y-4">
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
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
                name="email"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"></textarea>
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="max-h-10 transform duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover hover:dark:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main">
              Submit
            </button>
            {formStatus && (
              <div className="text-green-500 text-sm mt-4">{formStatus}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
