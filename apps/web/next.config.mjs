import { readdirSync } from "node:fs";
import { join } from "node:path";

const transpilePackages = readdirSync(join(process.cwd(), "..", "..", "packages")).map((pkg) => `@website/${pkg}`);

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: { domains: ["raw.githubusercontent.com"] },
	transpilePackages,
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
