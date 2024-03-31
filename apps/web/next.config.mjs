/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: { domains: ["raw.githubusercontent.com"] },
	redirects: () => {
		/** @type {import('next').Redirect[]} */
		const redirects = [
			{ permanent: true, destination: "https://github.com/snowcrystals", source: "/github" },
			{ permanent: true, destination: "https://github.com/snowcrystals/:repo", source: "/github/:repo" }
		];
		return redirects;
	}
};

export default config;
