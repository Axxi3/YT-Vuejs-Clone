/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    // Add classes you suspect might be purged unnecessarily
    'bg-red-500',
    'text-center',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
