/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        main: "#0682a6",
        purple: "#6C40B5",
        "purple-dark": "#28124D",
        "white-0": "rgba(255, 255, 255, 0.0)",
        "white-100": "rgba(255, 255, 255, 0.20)",
        "white-400": "rgba(255, 255, 255, 0.40)",
        "white-500": "rgba(255, 255, 255, 0.50)",
        "black-200": "rgba(0, 0, 0, 0.20)",
        "black-500": "rgba(0, 0, 0, 0.40)",
        "dark-300": "rgba(26, 26, 26, 0.30)",
        "dark-500": "rgba(26, 26, 26, 0.50)",
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "19px"],
        base: ["16px", "22px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
      fontFamily: {
        sans: ["Noto Sans"],
      },
      boxShadow: {
        button: "0px 4px 12px rgba(0, 0, 0, 0.10)",
      },
      scale: {
        83: "0.8333",
        66: "0.6666",
      },

      borderRadius: {
        search: "20px",
      },
      border: {
        outerContainer: "",
      },
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        background: "url('/bg-light.png')",
        backgroundDark: "url('/bg-dark.png')",
        searchIcon: "url('/search.svg')",
        sunBg: "url('/sun.png')",
        cloundBg: "url('/cloud.png')",
        delete: "url('/delete.png')",
        searchSmall: "url('/search-small.png')",
        searchSmallDark: "url('/search-dark.svg')",
        deleteDark: "url('/delete-dark.svg')",
      },
    },
  },
  plugins: [],
};
