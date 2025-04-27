/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ebrikkho: {
          primary: "#6BBF59",
          secondary: "#A3D9A5",
          accent: "#FFDC5E",
          neutral: "#2A2E2D",
          "base-100": "#ffffff",
          "base-200": "#f3fdf4",
          "base-300": "#e1f3e3",
          info: "#88d1e8",
          success: "#5FD068",
          warning: "#F7C04A",
          error: "#F05454",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    themes: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
};
