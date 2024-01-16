/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#DADCDA',
        'text-gray': '#656565'
      },
    }
  },
  plugins: [],
  "tailwindCSS.includeLanguages": {     
    "javascript": "javascript",
    "html": "HTML"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}

