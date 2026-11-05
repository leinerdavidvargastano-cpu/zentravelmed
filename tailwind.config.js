/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          dark: "#14532D",
          DEFAULT: "#15803D",
          light: "#86EFAC",
          bg: "#F0FDF4",
        },
        ink: "#1F2937",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(20,83,45,.06), 0 8px 24px -8px rgba(20,83,45,.12)",
        lift: "0 2px 4px rgba(20,83,45,.08), 0 20px 40px -12px rgba(20,83,45,.25)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "none" } },
        "fade-in": { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fade-in .3s ease-out both",
      },
    },
  },
  plugins: [],
};
