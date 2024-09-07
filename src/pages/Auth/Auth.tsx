import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import * as yup from "yup";
import { useFormik } from "formik";
import { login, register } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const registerValidationSchema = yup.object({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters long")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
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
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
    privacy: yup
      .boolean()
      .oneOf([true], "You must accept the privacy policy")
      .required(),
  });

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "The password must contain at least 6 characters")
      .matches(/[A-Z]/, "Password must contain an uppercase letter")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .matches(/[0-9]/, "Password must contain a number")
      .matches(/[\W_]/, "Password must contain a special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      privacy: false,
    },
    validationSchema: isRegistering
      ? registerValidationSchema
      : loginValidationSchema,
    onSubmit: (values) => {
      if (isRegistering) {
        dispatch(
          register(values.name, values.email, values.password, rememberMe)
        );
      } else {
        dispatch(login(values.email, values.password, rememberMe));
      }
    },
    validateOnMount: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mx-auto p-6">
      <div className="container mx-auto p-6 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md max-w-md space-y-6">
        <h2 className="text-3xl font-semibold">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <form onSubmit={formik.handleSubmit} className="space-y-6 w-full">
          {isRegistering && (
            <div>
              <input
                id="name"
                name="name"
                type="text"
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
          )}
          <div>
            <input
              id="email"
              name="email"
              type="email"
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
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {isRegistering && (
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                required
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          )}
          {isRegistering && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.terms}
                  className="mr-2"
                />
                <label
                  htmlFor="terms"
                  className="text-light-text-secondary dark:text-dark-text-secondary cursor-pointer">
                  I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
                    Terms of Service
                  </Link>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.privacy}
                  className="mr-2"
                />
                <label
                  htmlFor="privacy"
                  className="text-light-text-secondary dark:text-dark-text-secondary cursor-pointer">
                  I agree to the{" "}
                  <Link
                    to="/privacy-policy"
                    className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.terms}
                </div>
              ) : null}
              {formik.touched.privacy && formik.errors.privacy ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.privacy}
                </div>
              ) : null}
            </div>
          )}
          {!isRegistering && (
            <div>
              <Link
                to="/reset-password"
                className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
                Forgot your password?
              </Link>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              className="mr-2"
              onChange={(e) => setRememberMe(e.target.checked)}
              checked={rememberMe}
            />
            <label
              htmlFor="rememberMe"
              className="text-light-text-secondary dark:text-dark-text-secondary cursor-pointer">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full transition-bg duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main">
            {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
