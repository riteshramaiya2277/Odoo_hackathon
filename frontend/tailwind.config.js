/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Deep blue
        primaryHover: "#1D4ED8",
        secondary: "#1E293B", // Dark slate for sidebar
        accent: "#0EA5E9",
        status: {
          green: "#10B981", // Available/Completed
          amber: "#F59E0B", // In Shop/Pending
          red: "#EF4444",   // Suspended/Expired
          blue: "#3B82F6",  // On Trip/Dispatched
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
