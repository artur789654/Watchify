module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-head-foot": "#E5E7EB",
        "light-primary": "#F3F4F6", // Фон сайту
        "light-secondary": "#FFFFFF", // Альтернативний фон
        "light-text-main": "#1A1A1A", // Основний текст
        "light-text-secondary": "#4B5563", // Вторинний текст
        "light-heading": "#111827", // Заголовки
        "light-button-main": "#EF4444", // Основний колір кнопок
        "light-button-hover": "#DC2626", // Ховер/активний стан кнопок
        "light-link-main": "#000000", // Основний колір лінків
        "light-link-hover": "#333333", // Ховер/фокус лінків
        "light-link-active": "#666666", // Активний стан лінків
        "light-block-bg": "#FFFFFF", // Фон блоків
        "light-block-border": "#E5E7EB", // Кордон блоків
        "light-nav-bg": "#1F2937", // Фон навігаційного меню
        "light-icon": "#374151", // Іконки та елементи інтерфейсу

        "dark-head-foot": "#181818",
        "dark-primary": "#1C1C1C", // Фон сайту
        "dark-secondary": "#121212", // Альтернативний фон
        "dark-text-main": "#E5E7EB", // Основний текст
        "dark-text-secondary": "#9CA3AF", // Вторинний текст
        "dark-heading": "#F9FAFB", // Заголовки
        "dark-button-main": "#EF4444", // Основний колір кнопок
        "dark-button-hover": "#DC2626", // Ховер/активний стан кнопок
        "dark-link-main": "#FFFFFF", // Основний колір лінків
        "dark-link-hover": "#CCCCCC", // Ховер/фокус лінків
        "dark-link-active": "#999999", // Активний стан лінків
        "dark-block-bg": "#1F1F1F", // Фон блоків
        "dark-block-border": "#333333", // Кордон блоків
        "dark-nav-bg": "#111827", // Фон навігаційного меню
        "dark-icon": "#9CA3AF", // Іконки та елементи інтерфейсу
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
