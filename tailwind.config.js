/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './pages/**/*.tsx', './components/**/*.tsx', './scripts/**/*.mjs'],
  theme: {
    extend: {
      colors: {
        // Hautezelle brand teal. 500 is the brand colour; 700 and darker carry text and buttons.
        teal: {
          50: '#effbf9', 100: '#d5f4f0', 200: '#abe8e1', 300: '#74d6cc', 400: '#3cc2b6', 500: '#12b5a9',
          600: '#0e978e', 700: '#0d7a74', 800: '#0e615e', 900: '#0f4f4e', 950: '#073233',
        },
        ivory: '#f7faf9',
        ink: '#13201f',
        mist: '#e3eeec',
      },
      fontFamily: {
        sans: ['Gambetta', 'Georgia', '"Times New Roman"', 'serif'],
        serif: ['Gambetta', 'Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};
