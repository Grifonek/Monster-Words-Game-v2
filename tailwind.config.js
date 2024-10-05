/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "finish-line":
          "repeating-conic-gradient(#000000 0% 25%, #ffffff 0% 50%)",
      },
      backgroundSize: {
        "finish-line": "20px 20px",
      },
      backgroundPosition: {
        "finish-line": "50%",
      },
    },
  },
  plugins: [],
};
