const config = require("../../tailwind.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
	...config,
	content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"]
};
