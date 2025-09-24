// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que todos os ficheiros na pasta src são lidos
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': {
          DEFAULT: '#f59e0b', // Laranja/Ambar
          light: '#fbbf24',   // Variação mais clara
        },
        'brand-dark': '#44403c', // Marrom escuro para texto
        'brand-bg': '#fffbeb',   // Fundo de cor creme/amarelo muito claro
      }
    },
  },
  plugins: [],
}