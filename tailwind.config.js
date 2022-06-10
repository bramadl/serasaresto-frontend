/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        neutral: "#F5F5F5",
        highlight: "#04B58E",
        success: "#EBFAED",
        process: "#FAF7EB",

        // Actual Colors
        green: "#04C99E",
        icon: "#C9C9C9",
        placeholder: "#A5ABAB",
        primary: "#272A2A",
        red: "#F83F3F",
        secondary: "#717A7A",
        "read-only": "#E9E9E9",
        yellow: "#E9B602",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
