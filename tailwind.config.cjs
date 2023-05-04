const plugin = require("tailwindcss/plugin");

const hocusPlugin = plugin((api) => {
	api.addVariant("hocus", ["&:focus", "&:hover"]);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	darkMode: "class",
	theme: {
		extend: {
			fontSize: Array(24)
				.fill(null)
				.map((_, key) => ({ [key + 1]: [(key + 1) * 4] }))
				.reduce((a, b) => ({ ...a, ...b }), {}),
			borderColor: {},
			colors: {
				primary: "#73A2FE"
			},
			backgroundColor: {
				dark: "#1C1C1C",
				primary: "#73A2FE"
			}
		}
	},
	plugins: [hocusPlugin]
};
