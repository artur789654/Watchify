import { Link, useLocation } from "react-router-dom";
import logoLight from "../../assets/images/logoLight.png";
import logoDark from "../../assets/images/logoDark.png";
import { useEffect } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/storageUtils";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaSun,
  FaMoon,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { MdOutlineLogin, MdLogout } from "react-icons/md";
import useToggle from "../../hooks/useToggle";

function Header() {
  const savedTheme = getFromLocalStorage("theme") === "dark";
  const [isDarkMode, setIsDarkMode] = useToggle(savedTheme);
  // const [isAuthenticated, setIsAuthenticated] =useState(false);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    setToLocalStorage("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-light-link-active dark:text-dark-link-active"
      : "text-light-link-main dark:text-dark-link-main";
  };

  return (
    <header className="shadow-md p-2 bg-light-head-foot dark:bg-dark-head-foot">
      <div className="container flex justify-between items-center m-auto">
        <div className="branding w-20 ml-4">
          <Link to="/" aria-label="Home link and Logo">
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="Watchify logo"
              width="64px"
              height="64px"
            />
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <div className="text-center text-lg font-light text-light-text-main dark:text-dark-text-main">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={setIsDarkMode}
                className="sr-only peer"
                aria-label="switcher theme toggle"
              />
              <div className="px-1 relative w-11 h-6 bg-light-secondary dark:bg-dark-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-light-link-hover dark:peer-focus:ring-dark-link-hover rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-100 after:border-light-text-secondary dark:after:border-dark-text-secondary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-light-link-main dark:peer-checked:bg-dark-link-main flex items-center justify-between p-0.5">
                <span className="text-sm text-light-link-hover transition-transform duration-300 peer-checked:transform peer-checked:scale-0">
                  <FaSun />
                </span>
                <span className="text-sm text-dark-link-hover transition-transform duration-300 peer-checked:transform peer-checked:scale-100">
                  <FaMoon />
                </span>
              </div>
            </label>
          </div>

          <button
            className="text-light-text-main dark:text-dark-text-main md:hidden"
            onClick={setIsMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav
            className={`fixed top-[78px] -left-6 z-10 w-full h-full bg-light-primary dark:bg-dark-primary md:static md:w-auto md:h-auto md:bg-transparent md:flex md:space-x-6 transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}>
            <div
              className={`flex flex-col md:flex-row md:space-x-6 items-center md:space-y-0 space-y-6`}>
              <Link
                className={`flex items-center space-x-2 font-medium duration-300 ${getNavLinkClass(
                  "/"
                )} hover:scale-110`}
                to="/"
                onClick={setIsMenuOpen}
                aria-label="Home link"
                aria-current={location.pathname === "/" ? "page" : undefined}>
                <FaHome />
                <span>Home</span>
              </Link>

              <Link
                className={`flex items-center space-x-2 font-medium duration-300 ${getNavLinkClass(
                  "/search"
                )} hover:scale-110`}
                to="/search"
                onClick={setIsMenuOpen}
                aria-label="Search link"
                aria-current={
                  location.pathname === "/search" ? "page" : undefined
                }>
                <FaSearch />
                <span>Search</span>
              </Link>

              <Link
                className={`flex items-center space-x-2 font-medium duration-300 ${getNavLinkClass(
                  "/profile"
                )} hover:scale-110`}
                to="/profile"
                onClick={setIsMenuOpen}
                aria-label="Profile link"
                aria-current={
                  location.pathname === "/profile" ? "page" : undefined
                }>
                <FaUser />
                <span>Profile</span>
              </Link>

              <Link
                className={`flex items-center space-x-2 font-medium duration-300 ${getNavLinkClass(
                  "/login"
                )} hover:scale-110`}
                to="/login"
                onClick={setIsMenuOpen}
                aria-label="Login link"
                aria-current={
                  location.pathname === "/login" ? "page" : undefined
                }>
                <span>Login</span>
                <MdOutlineLogin />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
