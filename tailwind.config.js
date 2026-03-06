/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // App Router
    './components/**/*.{js,ts,jsx,tsx}',
     './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair_display: ['Playfair Display', 'serif'],
        jetbrains_mono: ['JetBrains Mono', 'monospace'],
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    
  ],
}
