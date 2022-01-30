module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    variants: {
      extend: {
        padding: ["last"],
      },
    },
    extend: {
      colors: {
        "insta-white": "#efefef",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
