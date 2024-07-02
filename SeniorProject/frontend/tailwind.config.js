const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      primaryColor: "#0067FF",
      yellowColor: "#FEB60D",
      purpleColor: "#9771FF",
      irisBlueColor: "#01B5C5",
      headingColor: "#181A1E",
      textColor: "#4E545F",
      Offwh: "#fefefa",
      bluehavy: "#28AADC",
      babyblue: "#F3FAFF",
      darkblue: "#300285",
      heavygreen: "#64EBB6",
    },
    boxShadow: {
      panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
    },
    extend: {},
  },
  plugins: [],
});
