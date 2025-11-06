/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        3.5: "14px",
        4.5: "19px",
        6.5: "28px",
        9.5: "38px",
        21: "84px",
        29: "124px",
        90: "360px",
        128: "32rem",
        144: "36rem",
      },
      colors: {
        br1: "#C7C7C7",
        "br1.5": "#C6C6C669",
        br2: "#E3E4E4",
        br3: "#F7F7F7",
        br4: "#D8D8D8",
        bg1: "#EDEDED",
        bg2: "#F2FEF8",
        txt_dark: "#404164",
        txt_dark2: "#585858",
        primary: "#000130",
        secondary: "#808097",
        grey: "#F8F8F8",
        light_grey: "#FAFAFA",
        light_grey2: "#F5F5F5",
        light_dark: "#25262880",
        subtle: "#818181",
        neutral: "#F4F7FC",
        neutral_light: "#FAFCFF",
        dark: "#252628",
        credit_light: "#E0F5EB",
        debit_light: "#FFE8EC",
        debit: "#A31616",
        pending_light: "#D68F0240",
        pending_strong: "#D68F02",
        overdue_light: "#E4191940",
        overdue: "#E41919",
        due_light: "#31A05740",
        due: "#31A057",
        pending: "#FDEECE",
        pnd: "#8E6306",
        success: "#E0F5EB",
        scs: "#05603A",
        scs_bg: "#ECFDF3",
        danger: "#FFCBCB",
        dng: "#A00000",
        dng2: "#F47B7B",
        dng3: "#FFEDED",
        tgr: "#1A7D36",
      },
      lineHeight: {
        3.5: "14px",
        4.5: "19px",
        38: "38px",
      },
      fontSize: {
        lrge: "32px",
      },
      fontFamily: {
        sf: ["SF Compact Text", "ui-sans-serif", "system-ui", "sans-serif"],
        redwing: ["redwing", "ui-sans-serif", "system-ui", "sans-serif"],
        inter: ["inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      screens: {
        smallLaptop: { max: "1248px" },
        // => @media (max-width: 1248px) { ... }
        laptop: { min: "1249px" },
        // => @media (min-width: 1249px) { ... }

        verySmallLaptop: { max: "1024px" },
        // => @media (max-width: 1024px) { ... }
        largeTablet: { max: "992px" },
        // => @media (max-width: 992px) { ... }
        tablet: { max: "800px" },
        // => @media (max-width: 800px) { ... }
        xl: { min: "850px" },
        // => @media (min-width: 850px) { ... }

        smallTablet: { max: "600px" },
        // => @media (max-width: 600px) { ... }

        phone: { max: "450px" },
        // => @media (max-width: 350px) { ... }
      },
    },
  },
  plugins: [],
};
