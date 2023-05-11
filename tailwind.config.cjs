const plugin = require("tailwindcss/plugin");

const hocusPlugin = plugin((api) => {
	api.addVariant("hocus", ["&:focus", "&:hover"]);
});

const generateSizes = (count, unit) =>
	Array(count)
		.fill(null)
		.map((_, key) => ({ [key + 1]: `${(key + 1) * 4}${unit || "px"}` }))
		.reduce((a, b) => ({ ...a, ...b }), {});

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	darkMode: "class",
	theme: {
		extend: {
			fontSize: generateSizes(24),

			// Widths
			width: generateSizes(96, "rem"),
			maxWidth: generateSizes(96, "rem"),
			minWidth: generateSizes(96, "rem"),

			// Colors
			borderColor: {},
			colors: {
				primary: "#73A2FE",
				white: "#fff",

				"markdown-dark": "#333333",
				"markdown-light": "#d8dee4"
			},
			backgroundColor: {
				dark: "#1C1C1C",
				primary: "#73A2FE"
			}
		}
	},
	plugins: [hocusPlugin]
};
