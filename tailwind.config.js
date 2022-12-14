/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "day-shadow-posts":
          "0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(37, 90, 19, 0.0196802)",
      },
      colors: {
        "day-bg-posts": "#E9F5E8",
        "day-bg-main-posts": "#EFEFEF",
        "modal-overlay": "rgba(0,0,0,0.7)",
        "navbar-dark-mode": "#101010",
      },
      dropShadow: {
        button: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
