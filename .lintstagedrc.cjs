module.exports = {
	"**/*.{js,jsx,ts,tsx}": (filenames) => ["pnpm run lint", `prettier --write ${filenames.join(" ")}`]
};
