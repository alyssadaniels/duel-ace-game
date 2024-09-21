/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "plum-1": "#2b051e", //"#3D0329",
                "plum-2": "#762A5A",
                "plum-3": "#A45587",
                "cherry-1": "#EC443D",
                "cherry-2": "#FD756F",
                "dandelion-1": "#F2AA3E",
                "dandelion-2": "#FFCA7D",
                "creme-1": "#E2D4BB",
                "creme-2": "#EDECE6",
            },
            aspectRatio: {
                "3/4": "3 / 4",
            },
            keyframes: {
                grow: {
                    "0%": { transform: "scale(0, 0)" },
                    "80%": { transform: "scale(1.08, 1.08)" },
                    "100%": { transform: "scale(1, 1)" },
                },
                "delayed-grow": {
                    "0%": { transform: "scale(0, 0)" },
                    "70%": { transform: "scale(0, 0)" },
                    "100%": { transform: "scale(1, 1)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-10deg)" },
                    "50%": { transform: "rotate(10deg)" },
                },
                shake: {
                    "0%, 100%": { transform: "translate(0)" },
                    "25%": { transform: "translate(-0.5rem, 0)" },
                    "75%": { transform: "translate(0.5rem, 0)" },
                },
                "shrink-x": {
                    "0%": { transform: "scale(1, 1)" },
                    "80%": { transform: "scale(0, 1)" },
                    "100%": { transform: "scale(0, 1)" },
                },
            },
            animation: {
                "delayed-grow": "delayed-grow 0.8s linear 1",
                grow: "grow 0.25s linear 1",
                wiggle: "wiggle 1s linear infinite",
                shake: "shake 0.2s linear 1",
            },
        },
    },
    plugins: [],
    future: {
        hoverOnlyWhenSupported: true,
    },
};
