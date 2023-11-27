/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
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
                    disabledBtn:"#6e6f6c",
                },
            },
            // spotify common padding
            padding: {
                Padding8px: "0.5rem",
            },
        },
    },
    plugins: [],
};
