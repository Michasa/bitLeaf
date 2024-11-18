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
    			background: 'var(--background)',
    			foreground: 'var(--foreground)'
    		},
    		zIndex: {
    			'1': '1'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
