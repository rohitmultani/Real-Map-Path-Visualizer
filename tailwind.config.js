// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%': { opacity: '0.7', strokeWidth: '3', stroke: '#ff6f00' },
          '100%': { opacity: '1', strokeWidth: '7', stroke: '#ffcc00' },
        },
        lightning: {
          '0%': { opacity: '0.7', strokeWidth: '4', stroke: '#ffff00' },
          '100%': { opacity: '1', strokeWidth: '8', stroke: '#ffffff' },
        },
      },
      animation: {
        glow: 'glow 1s infinite alternate',
        lightning: 'lightning 0.5s infinite alternate',
      },
    },
  },
  plugins: [],
}