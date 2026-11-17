/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			cream: {
  				DEFAULT: '#E8E9EA',
  				dim: '#B9C2C3'
  			},
  			ink: {
  				DEFAULT: '#0A2426',
  				deep: '#071A1C',
  				surface: '#0F2F32'
  			},
  			vital: {
  				DEFAULT: '#F0DDBC',
  				bright: '#F0DDBC',
  				dim: '#1D4A4D'
  			},
  			ash: {
  				DEFAULT: '#9FB3B4',
  				dark: '#6F8A8C'
  			},
  			line: '#1D4A4D'
  		},
  		fontFamily: {
  			heading: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
