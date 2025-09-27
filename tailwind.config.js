/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        cloudSlow: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(120vw)" },
        },
        cloudMedium: {
          "0%": { transform: "translateX(-250px)" },
          "100%": { transform: "translateX(120vw)" },
        },
        cloudFast: {
          "0%": { transform: "translateX(-300px)" },
          "100%": { transform: "translateX(120vw)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        cloudSlow: "cloudSlow 40s linear infinite",
        cloudMedium: "cloudMedium 50s linear infinite",
        cloudFast: "cloudFast 30s linear infinite",
        gradientShift: "gradientShift 12s ease infinite",
        twinkle: "twinkle 2s infinite",
      },
    },
  },
  plugins: [],
};
