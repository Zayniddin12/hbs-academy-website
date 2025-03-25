module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "1112px",
        },
      },
      colors: {
        primary: {
          DEFAULT: "#16CC53",
          hover: "#0DB23B",
        },
        secondary: {
          DEFAULT: "#EDF1F5",
          hover: "#F2F2F2",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F7F9FA",
          // 50: "#FBFBFB",
          // 100: "#E5E7EE",
          // 200: "#ECF3FA",
          // 300: "#F0F0F5",
          // 400: "#F5F5F6",
          // 150: "#FCFCFC",
          // 200: "#F6F8FA",
          // 300: "#E5EFFE",
          // 500: "#FCFDFE",
        },
        blue: {
          DEFAULT: "#4489F7",
          100: "#52618F",
          200: "#A2BCDE",
          300: "#ECF2F8",
          400: "#737FA4",
          800: "#022F5E",
          900: "#090E14",
          //
          // 50: "#E8F0FE",
          // 100: "#EAF2FE",
          // 200: "#009EF7",
          // 400: "#3075D7",
          // 500: "#1385FA",
        },
        gray: {
          DEFAULT: "#8898AA",
          100: "#5A6168",
          200: "#C8CFD6",
          // 100: "#B8BABE",
          // 200: "#8E9BA8",
          // 300: "#E5E7EE",
          // 400: "#F5F6F7",
          // 500: "#F5F6F6",
          // 700: "#596066",
        },
        dark: {
          DEFAULT: "#080A15",
          50: "#252429",
          100: "#121C25",
          200: "#2C3752",
          300: "#151516",
        },
        red: {
          DEFAULT: "#E52E30",
          100: "#FF5A5A",
          200: "#E43429",
        },
        green: {
          DEFAULT: "#3DD641",
          100: "#EDF1F5",
          200: "#E8FAEE",
        },
        yellow: {
          DEFAULT: "#F9A82F",
          200: "#FDA859",
        },
      },
      gridTemplateColumns: {
        "1-max": "1fr max-content",
        "max-1": "max-content 1fr",
        "max-1-max": "max-content 1fr max-content",
      },
      lineHeight: {
        14: "14px",
        23: "23px",
        110: "110%",
        120: "120%",
        130: "130%",
        140: "140%",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      zIndex: {
        90: "90",
        100: "100",
      },
      fontSize: {
        "2xs": "0.8125rem", // 13px
        "4.5xl": "2.5rem", // 40px
        "3.5xl": "2rem", // 32px
      },
    },
  },
  plugins: [],
};
