import { readdirSync } from "node:fs";
import { join } from "node:path";

const transpilePackages = readdirSync(join(process.cwd(), "..", "..", "packages")).map((pkg) => `@website/${pkg}`);

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	transpilePackages,
	experimental: { appDir: true },
	redirects: async () => {
		return [{ source: "/docs", destination: "/docs/iglo/main", permanent: false }]; // TODO: remove temporary redirect
	}
};

export default config;
