module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.5)',
        md: '3px 3px 6px rgba(0,0,0,0.7)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.5)',
        },
        '.text-shadow-md': {
          'text-shadow': '3px 3px 6px rgba(0,0,0,0.7)',
        },
      })
    }
  ],
}
