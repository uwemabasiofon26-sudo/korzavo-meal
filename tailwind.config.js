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
  				DEFAULT: '#F4F7FA',
  				dim: '#C5CFD9'
  			},
  			ink: {
  				DEFAULT: '#05070D',
  				deep: '#000000',
  				surface: '#0B1017'
  			},
  			vital: {
  				DEFAULT: '#FF2A2A',
  				bright: '#FF5252',
  				dim: '#4A0B12'
  			},
  			ash: {
  				DEFAULT: '#8FA0B2',
  				dark: '#5F7285'
  			},
  			line: '#1B2A3A',
  			neon: {
  				DEFAULT: '#22E1FF',
  				dim: '#0A3440'
  			}
  		},
  		fontFamily: {
  			heading: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
  		},
  		keyframes: {
  			'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
  			'glow': { '0%,100%': { opacity: '0.5', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.12)' } },
  			'marquee-x': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  			'gradient-x': { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
  			'ping-soft': { '0%': { transform: 'scale(1)', opacity: '0.7' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
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
  			'float': 'float 6s ease-in-out infinite',
  			'float-slow': 'float 8s ease-in-out infinite',
  			'glow': 'glow 7s ease-in-out infinite',
  			'marquee-x': 'marquee-x 30s linear infinite',
  			'gradient-x': 'gradient-x 7s linear infinite',
  			'ping-soft': 'ping-soft 2s ease-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
