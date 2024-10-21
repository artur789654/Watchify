module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-head-foot": "#E5E7EB",
        "light-primary": "#F3F4F6", 
        "light-secondary": "#FFFFFF", 
        "light-text-main": "#1A1A1A", 
        "light-text-secondary": "#4B5563", 
        "light-button-main": "#22c55e", 
        "light-button-hover": "#16a34a",
        "light-link-main": "#000000", 
        "light-link-hover": "#333333",
        "light-link-active": "#666666",

        "dark-head-foot": "#1C1C1C",
        "dark-primary": "#181818", 
        "dark-secondary": "#121212", 
        "dark-text-main": "#E5E7EB",
        "dark-text-secondary": "#9CA3AF",
        "dark-button-main": "#EF4444",
        "dark-button-hover": "#DC2626", 
        "dark-link-main": "#FFFFFF", 
        "dark-link-hover": "#CCCCCC", 
        "dark-link-active": "#999999",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
      transform: ["hover", "focus", "active"],
      textColor: ["hover", "focus", "active"],
    },
  },
  plugins: [],
};
