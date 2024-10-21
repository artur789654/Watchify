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

  const [filterType, setFilterType] = useState<string>("all");

  const handleChangeInfo = () => {
    setIsEditingInfo((prev) => !prev);
    setIsChangePass(false);
  };
  const handleChangePass = () => {
    setIsChangePass((prev) => !prev);
    setIsEditingInfo(false);
  };

  const filteredItems = items.filter((item: Movie | TVShow) => {
    if (filterType === "all") return true;
    return filterType === "movie" ? "title" in item : "name" in item;
  });

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
      dispatch(
        updateUserProfile(values.displayName, values.email, values.password)
      )
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
    <div className="containe m-4 mx-auto p-4 space-y-6">
      <div className="bg-light-secondary dark:bg-dark-secondary p-6 rounded-md shadow-md">
        <h2 className="text-start text-2xl font-semibold mb-6">Profile Information</h2>
        {isEditingInfo ? (
          <form
            className="max-w-xs mx-auto space-y-4"
            onSubmit={profileFormik.handleSubmit}>
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
              className="mr-4 p-2 rounded text-dark-text-main bg-dark-button-main hover:bg-dark-button-hover transition-bg duration-300">
              Cancle
            </button>
            <button
              type="submit"
              className="p-2 rounded text-dark-text-main bg-light-button-main hover:bg-light-button-hover transition-bg duration-300">
              {loading ? "Saving..." : "Save"}
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
          <div className=" space-y-4">
            <p className="text-start text-lg">
              <strong>Name:</strong> {user?.displayName}
            </p>
            <p className="text-start text-lg">
              <strong>Email:</strong> {user?.email}
            </p>
            <button
              onClick={handleChangeInfo}
              className="p-2 rounded text-dark-text-main bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover">
              Change Personal Info
            </button>
          </div>
        )}

        <div className="mt-4 space-x-4">
          {isChangePass ? (
            <form
              className="max-w-xs mx-auto space-y-4"
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
                className="mr-4 p-2 rounded text-dark-text-main bg-dark-button-main hover:bg-dark-button-hover transition-bg duration-300">
                Cancle
              </button>
              <button
                type="submit"
                className="p-2 rounded text-dark-text-main bg-light-button-main hover:bg-light-button-hover transition-bg duration-300">
                Save
              </button>
            </form>
          ) : (
            <button
              onClick={handleChangePass}
              className="p-2 rounded text-dark-text-main bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover">
              Change Password
            </button>
          )}
        </div>
      </div>
      <div className="bg-light-secondary dark:bg-dark-secondary p-6 rounded-md shadow-md space-y-6">
        <div className="flex flex-wrap justify-between gap-4">
        <h2 className="text-2xl font-semibold">Watchlist</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="font-medium">
            Filter by:
          </label>
          <select
            name="filter"
            id="filter"
            className="w-fit border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 shadow-sm"
            value={filterType}
            onChange={(e)=> setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>
        </div>
        {filteredItems.length > 0 ? (
          <div className="flex flex-wrap gap-4  md:justify-start justify-center">
            {filteredItems.map((item: Movie | TVShow, index: number) => (
              <Card key={`${index}${item.id}`} media={item} />
            ))}
          </div>
        ) : (
          <p>No items in your watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
