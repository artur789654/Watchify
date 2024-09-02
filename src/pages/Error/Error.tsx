import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <div className="container mx-auto m-4 p-6 rounded-md shadow-md bg-light-secondary dark:bg-dark-secondary h-[65vh] flex flex-col gap-6 items-center justify-center">
      <h1 className="text-9xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-4xl font-semibold">Oops! Page Not Found...</h2>
      <p className="text-light-text-secondary dark:text-dark-text-secondary">
        The page you’re looking for doesn’t seem to exist. It might have been
        moved or deleted.
      </p>
      <Link
        to="/"
        className=" my-6 transition-bg duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover text-dark-text-main px-4 py-2 rounded-md">
        Go to HomePage
      </Link>
    </div>
  );
};

export default Error;
