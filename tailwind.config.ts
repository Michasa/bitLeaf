/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				xs: '425px'
			},
			colors: {
				brand: {
					dark: {
						'100': '#82827D',
						'200': '#6D6D69',
						'300': '#585855',
						'400': '#444441',
						'500': '#2F2F2D',
						'600': '#1A1A19',
						DEFAULT: '#1A1A19'
					},
					green: {
						'100': '#92CA71',
						'200': '#7BBF53',
						'300': '#67AA3F',
						'400': '#558D34',
						'500': '#436F29',
						'600': '#31511E'
					},
					olive: {
						'100': '#BDD186',
						'200': '#ADC568',
						'300': '#9CBA4B',
						'400': '#859F3D',
						'500': '#63762D',
						'600': '#414E1E',
						DEFAULT: '#859F3D'
					},
					light: '#F6FCDF'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			zIndex: {
				'1': '1'
			},
			fontFamily: {
				orbitron: ['var(--font-orbitron)'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		require('tailwindcss-animated')
	],
} satisfies Config;
