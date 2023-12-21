/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "18px": "18px",
      },
      // spotify colors
      colors: {
        spotify: {
          black: "#121212",
          white: "#FFFFFF",
          green: "#1DB954",
          gray: "#535353",
          lightGray: "#B3B3B3",
          darkGray: "#282828",
          musicPlayer: "#3d3f3a",
          bigPlayer_1: "#5c5f58",
          bigPlayer_2: "#2f302d",
          disabledBtn: "#6e6f6c",
          // playlist colors
          playlist_1: "#1693A6",
          // playlist view - icon color
          iconColor1: "#A7A7A7",
        },
      },
      // spotify common padding
      padding: {
        Padding8px: "0.5rem",
        Padding12px: "0.75rem",
        Padding16px: "1rem",
      },
    },
  },
  plugins: [],
};
