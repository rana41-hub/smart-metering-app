/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    900: '#0f172a',
                },
                navy: {
                    800: '#0c1221',
                    900: '#070b14', // Deep Midnight Navy
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    glow: '#00f0ff', // Neon Cyan
                },
                amber: {
                    500: '#f59e0b',
                    glow: '#ffb700', // Warning Amber
                },
                red: {
                    500: '#ef4444',
                    glow: '#ff003c', // Pulse/Tamper Red
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace']
            }
        },
    },
    plugins: [],
}
