/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")], // kita tambahkan DaisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake"], // bisa custom theme nanti
  },
};
