/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  experimental: {
    disableOklch: true, // 👈 this disables the color format that breaks html2canvas/pdf generators
  },
};
