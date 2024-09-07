import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AppDispatch } from "../../store";
import {
  resetPassword,
  sendPasswordResetEmail,
} from "../../store/actions/authActions";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode") || undefined;
  const [step, setStep] = useState<"request" | "reset" | "success">(
    oobCode ? "reset" : "request"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const requestFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(sendPasswordResetEmail(values.email))
        .then(() => {
          setSuccessMessage(
            "Please check your email for further instructions."
          );
          setErrorMessage(null);
          setStep("success");
        })
        .catch(() => {
          setErrorMessage(
            errorMessage || "Failed to send reset email. Please try again."
          );
          setSuccessMessage(null);
        });
    },
  });

  const resetFormik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(6, "The password must contain at least 6 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[\W_]/, "Password must contain a special character")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      setErrorMessage(null);
      if (oobCode) {
        dispatch(resetPassword(oobCode, values.password))
          .then(() => navigate("/auth"))
          .catch((error) => {
            setErrorMessage(
              error.message || "Failed to reset password. Please try again."
            );
          });
      } else {
        setErrorMessage("Invalid or expired password reset link.");
      }
    },
  });
  return (
    <div className="container mx-auto p-6 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md max-w-md space-y-6">
      {step === "request" ? (
        <>
          <h2 className="text-3xl font-semibold">Password Reset Request</h2>
          <form onSubmit={requestFormik.handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={requestFormik.handleChange}
              onBlur={requestFormik.handleBlur}
              value={requestFormik.values.email}
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {requestFormik.touched.email && requestFormik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {requestFormik.errors.email}
              </div>
            ) : null}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 text-sm mt-1">
                {successMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full transition-bg duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main mt-6">
              Send Password Reset Email
            </button>
          </form>
        </>
      ) : step === "reset" ? (
        <>
          <h2 className="text-3xl font-semibold">Reset Password</h2>
          <form onSubmit={resetFormik.handleSubmit} className="space-y-6">
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                value={resetFormik.values.password}
                required
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
              {resetFormik.touched.password && resetFormik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {resetFormik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={resetFormik.handleChange}
                onBlur={resetFormik.handleBlur}
                value={resetFormik.values.confirmPassword}
                required
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
              {resetFormik.touched.confirmPassword &&
              resetFormik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  {resetFormik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full transition-bg duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main mt-6">
              Reset Password
            </button>
          </form>
        </>
      ) : (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Password Reset Request Sent
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Please check your email for further instructions.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
