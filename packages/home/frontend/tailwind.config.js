module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './frontastic/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [{ pattern: /bg-(.+)/ }],
  theme: {
    extend: {
      fontFamily: {
        body: 'Inter, sans-serif',
        heading: 'Libre Baskerville, serif',
      },
      fontSize: Object.fromEntries(
        Array(100)
          .fill(0)
          .map((_, i) => [i + 1, `${i + 1}px`]),
      ),
      lineHeight: {
        tight: '100%',
        normal: '125%',
        loose: '150%',
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1666px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
      },
      boxShadow: {
        100: '0px 2px 2px rgba(25, 40, 81, 0.05)',
        200: '0px 4px 4px rgba(25, 40, 81, 0.05)',
        300: '0px 8px 8px rgba(25, 40, 81, 0.05)',
        400: '0px 16px 16px rgba(25, 40, 81, 0.05)',
        dark: '0px 1px 6px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: {
          black: '#212121',
          dark: '#343434',
        },
        secondary: {
          black: '#494949',
          grey: '#474747',
        },
        accent: {
          red: '#D14253',
        },
        neutral: {
          100: '#FFFFFF',
          150: '#F7F9FC',
          200: '#F8F8F8',
          300: '#EFF0F5',
          400: '#DCE0EB',
          500: '#959595',
        },
        green: {
          100: '#ECF5F3',
          300: '#A8DBCD',
          500: '#26A682',
          600: '#229575',
          700: '#1D6E5E',
        },
        yellow: {
          100: '#FCEFD4',
          300: '#F6C669',
          500: '#F2AE29',
          600: '#C28B21',
          700: '#916819',
        },
        red: {
          100: '#F6E5E7',
          300: '#E0919A',
          500: '#CD3F50',
          600: '#AE1D32',
          700: '#8A182A',
        },
        blue: {
          100: '#ECF0FB',
          300: '#7A97E4',
          500: '#416BD8',
          600: '#2A4DA8',
          700: '#274082',
        },
      },
      spacing: Object.fromEntries(
        Array(200)
          .fill(0)
          .map((_, i) => [i + 1, `${i + 1}px`]),
      ),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
