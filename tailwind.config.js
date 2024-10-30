/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary":"#7F00FF",//white
        "accentI":"#FF9A8B ",//biege-white
        "accentII":"#C3ACD0",//light purple
        "bgcolor":"#FFF7E6",//purple
        "textcolorI": "#494949",
        "textcolorII": "#7743DB",
        "textcolorIII": "#fff"
      },
      fontFamily:{
        ibold:["Inter_900Black","sans-serif"],
        isemibold:["Inter_600SemiBold","sans-serif"],
        iregular:["Inter_400Regular","sans-serif"],
        ilight:["Inter_200ExtraLight","sans-serif"],
      }
    },
  },
  plugins: [],
}

// Linkup Dark V1
// colors:{
//   "primary":"#100d28",//violet
//   "secondary":"#3FC1C9",//teal
//   "neutral":"#F5F5F5",//white
//   "vibrant":"#FC5185"//pink
// },

// Linkup V1
// colors:{
//   "primary":"#FFFBF5",//white
//   "secondary":"#C3ACD0",//biege-white
//   "neutral":"#F7EFE5",//light purple
//   "vibrant":"#7743DB"//purple
// },

// Linkup V2
// colors:{
//   "primary":"#F0EFFF ",//white
//   "secondary":"#FF7F50 ",//biege-white
//   "neutral":"#FFD700 ",//light purple
//   "vibrant":"#7F00FF"//purple
// },

// Linkup V3
// colors:{
//   "primary":"#7F00FF",//white
//   "accentI":"#FFCC29",//biege-white
//   "accentII":"#88E0EF",//light purple
//   "bgcolor":"#FFF7E6"//purple
//   "textcolor": "#494949"
// },