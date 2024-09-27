import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Movie, TVShow } from "../../types/media";
import Card from "../../components/Card/Card";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeUserPassword,
  updateUserProfile,
} from "../../store/actions/authActions";
import * as yup from "yup";
import { useFormik } from "formik";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isEditingInfo, setIsEditingInfo] = useState<boolean>(false);
  const [isChangePass, setIsChangePass] = useState<boolean>(false);

  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.watchList);

  const handleChangeInfo = () => {
    setIsEditingInfo((prev) => !prev);
    setIsChangePass(false);
  };
  const handleChangePass = () => {
    setIsChangePass((prev) => !prev);
    setIsEditingInfo(false);
  };

  const profileFormik = useFormik({
    initialValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      password: "",
    },
    validationSchema: yup.object({
      displayName: yup
        .string()
        .min(2, "Name must be at least 2 characters long")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
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
    }),
    onSubmit: (values) => {
      setErrorMessage(null);
      dispatch(updateUserProfile(values.displayName, values.email, values.password))
        .then(() => {
          setSuccessMessage("Profile updated successfully");
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            error.message || "Failed to update profile. Please try again."
          );
        });
    },
  });

  const changePassFormik = useFormik({
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
      if (isChangePass) {
        dispatch(changeUserPassword(values.password))
          .then(() => {
            setSuccessMessage("Password changed ");
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              error.message || "Failed to reset password. Please try again."
            );
          });
      }
    },
  });

  const profileFormikRef = useRef(profileFormik);

  useEffect(() => {
    profileFormikRef.current = profileFormik;
  }, [profileFormik]);

  useEffect(() => {
    if (user) {
      profileFormikRef.current.setValues({
        displayName: user.displayName,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  return (
    <div className="containe m-4 mx-auto p-4 space-y-6 rounded-md shadow-md">
      <div className="bg-light-secondary dark:bg-dark-secondary p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        {isEditingInfo ? (
          <form className="space-y-4" onSubmit={profileFormik.handleSubmit}>
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                value={profileFormik.values.displayName}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
              {profileFormik.touched.displayName &&
              profileFormik.errors.displayName ? (
                <div className="text-red-500 text-sm mt-1">
                  {profileFormik.errors.displayName}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                value={profileFormik.values.email}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
              {profileFormik.touched.email && profileFormik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {profileFormik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                value={profileFormik.values.password}
                className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleChangeInfo}
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {loading ? "Saving..." : "Save changes"}
            </button>
            {successMessage && (
              <div className="text-green-500 text-sm mt-1">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
            )}
          </form>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <button
              onClick={handleChangeInfo}
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Change Personal Info
            </button>
          </div>
        )}

        <div className="mt-4 space-x-4">
          {isChangePass ? (
            <form
              className="space-y-4"
              onSubmit={changePassFormik.handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={changePassFormik.handleChange}
                  onBlur={changePassFormik.handleBlur}
                  value={changePassFormik.values.password}
                  className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
                />
              </div>
              {changePassFormik.touched.password &&
              changePassFormik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {changePassFormik.errors.password}
                </div>
              ) : null}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  onChange={changePassFormik.handleChange}
                  onBlur={changePassFormik.handleBlur}
                  value={changePassFormik.values.confirmPassword}
                  className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full shadow-sm"
                />
              </div>
              {changePassFormik.touched.confirmPassword &&
              changePassFormik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">
                  {changePassFormik.errors.confirmPassword}
                </div>
              ) : null}
              {successMessage && (
                <div className="text-green-500 text-sm mt-1">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
              )}
              <button
                type="button"
                onClick={handleChangePass}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Cancle
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </form>
          ) : (
            <button
              onClick={handleChangePass}
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Change Password
            </button>
          )}
        </div>
      </div>
      <div className="bg-light-secondary dark:bg-dark-secondary p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Watchlist</h2>
        {items.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {items.map((item: Movie | TVShow, index: number) => (
              <Card key={`${index}${item.id}`} media={item} />
            ))}
          </ul>
        ) : (
          <p>No items in your watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
