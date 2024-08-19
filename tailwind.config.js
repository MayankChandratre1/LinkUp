/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors:{
          "primary":"#100d28",//violet
          "secondary":"#3FC1C9",//teal
          "neutral":"#F5F5F5",//white
          "vibrant":"#FC5185"//pink
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

