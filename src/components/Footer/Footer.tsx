import { Link, useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import logoDark from "../../assets/images/logoDark.png";
import logoLight from "../../assets/images/logoLight.png";
import { useTheme } from "../../contexts/themeContext";

function Footer() {
  const location = useLocation();
  const { theme } = useTheme();
  return (
    <footer className="shadow-md p-4 bg-light-head-foot dark:bg-dark-head-foot text-light-text-main dark:text-dark-text-main">
      <div className="container mx-auto flex flex-wrap gap-4 justify-between">
        <div className="flex justify-between items-center w-full lg:flex-row flex-col gap-4">
          <div>
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="Logo"
              className="w-14 h-14"
            />
          </div>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:contact@website.com"
                className="hover:underline"
                aria-label="Contact Email">
                contact@website.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+380999999999"
                className="hover:underline"
                aria-label="Contact Phone">
                +(380) 99-999-99-99
              </a>
            </li>
          </ul>
          <nav className="lg:space-x-4 flex sm:flex-row flex-col items-center gap-4">
            <Link
              to="/about"
              aria-label="About Us"
              aria-current={location.pathname === "/about" ? "page" : undefined}
              className="inline-block font-medium transform transition-transform duration-300 hover:scale-105">
              About Us
            </Link>
            <Link
              to="/contact"
              aria-label="To the rights holders"
              aria-current={
                location.pathname === "/contact" ? "page" : undefined
              }
              className="inline-block font-medium transform transition-transform duration-300 hover:scale-105">
              Contact
            </Link>
            <Link
              to="/support"
              aria-label="Support"
              aria-current={
                location.pathname === "/support" ? "page" : undefined
              }
              className="inline-block font-medium transform transition-transform duration-300 hover:scale-105">
              Support
            </Link>
            <Link
              to="/faqs"
              aria-label="FAQs"
              aria-current={location.pathname === "/faqs" ? "page" : undefined}
              className="inline-block font-medium transform transition-transform duration-300 hover:scale-105">
              FAQs
            </Link>
          </nav>
          <ul className="flex space-x-4 ">
            <li className="hover:text-[#1877F2] transform transition-transform duration-300 hover:scale-105">
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer">
                <FaFacebook className="w-5 h-5" />
              </a>
            </li>
            <li className="hover:text-[#1DA1F2] transform transition-transform duration-300 hover:scale-105">
              <a
                href="https://x.com/"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer">
                <FaTwitter className="w-5 h-5" />
              </a>
            </li>
            <li className="hover:text-[#C13584] transform transition-transform duration-300 hover:scale-105">
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer">
                <FaInstagram className="w-5 h-5" />
              </a>
            </li>
            <li className="hover:text-[#0088CC] transform transition-transform duration-300 hover:scale-105">
              <a
                href="https://web.telegram.org/"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer">
                <FaTelegramPlane className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-dark-head-foot dark:border-light-head-foot pt-4 text-center w-screen">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 Watchify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
