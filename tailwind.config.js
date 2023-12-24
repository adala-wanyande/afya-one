/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include your own content paths
    "./src/**/*.{html,js}",

    // Add Flowbite's content path
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};