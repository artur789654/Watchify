import { Link, useLocation } from "react-router-dom";
import logoLight from "../../assets/images/logoLight.png";
import logoDark from "../../assets/images/logoDark.png";
import { FaBars, FaTimes, FaSearch, FaUser, FaHome } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import useToggle from "../../hooks/useToggle";
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import { useTheme } from "../../contexts/themeContext";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogOut = () => {
    dispatch(logout());
  };

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
              src={theme === "dark" ? logoDark : logoLight}
              alt="Watchify logo"
              width="64px"
              height="64px"
            />
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <ThemeBtn />

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
              {isAuthenticated && user && (
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
                  <span>{user?.displayName}</span>
                </Link>
              )}
              <Link
                className={`flex items-center space-x-2 font-medium duration-300 ${getNavLinkClass(
                  "/auth"
                )} hover:scale-110`}
                to={isAuthenticated ? "/" : "/auth"}
                onClick={isAuthenticated ? handleLogOut : setIsMenuOpen}
                aria-label={isAuthenticated ? "Log out" : "Auth link"}
                aria-current={
                  location.pathname === "/auth" ? "page" : undefined
                }>
                <span>{isAuthenticated ? "Log out" : "Log in"}</span>
                <MdOutlineLogin />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
