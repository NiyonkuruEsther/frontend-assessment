import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F1FF',
          100: '#C5DBFF',
          200: '#9EC4FF',
          400: '#276DF7',
          800: '#0E348C',
          DEFAULT: '#276DF7',
        },
        secondary: {
          50: '#E6F8EF',
          100: '#C2F0D9',
          200: '#99E8C0',
          400: '#01A85A',
          800: '#015F34',
          DEFAULT: '#01A85A',
        },

        tertiary: {
          50: '#E5E5E5',
          100: '#D9DDE3',
          200: '#BFC6D0',
          400: '#5E6C84',
          800: '#374152',
          DEFAULT: '#5E6C84',
        },

        warning: {
          50: '#FFF4E6',
          100: '#FFE4C2',
          200: '#FFD299',
          400: '#FF7A00',
          800: '#994A00',
          DEFAULT: '#FF7A00',
          foreground: '#FFFFFF',
        },
        error: {
          50: '#FEE8E6',
          100: '#FDCAC7',
          200: '#FCA8A3',
          400: '#F42C1F',
          800: '#921A12',
          DEFAULT: '#F42C1F',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
