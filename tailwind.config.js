import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ethiopian: {
          green: "#006400",
          yellow: "#FCD116",
          red: "#DA121A",
        },
      },
      fontFamily: {
        amharic: ['Noto Sans Ethiopic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
