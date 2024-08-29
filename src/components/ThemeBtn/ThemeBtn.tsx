import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../contexts/themeContext";
const ThemeBtn: React.FC = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className="text-center text-lg font-light text-light-text-main dark:text-dark-text-main">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
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
  );
};

export default ThemeBtn;
