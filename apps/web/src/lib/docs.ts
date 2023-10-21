import { readdir } from "node:fs/promises";
import { DOCS_DIRECTORY } from "./constants";
import { statSync } from "node:fs";
import { join } from "node:path";

/** Returns a list of packages with documentation */
export async function getPackages() {
	const entries = await readdir(DOCS_DIRECTORY);
	return entries.filter((str) => statSync(join(DOCS_DIRECTORY, str)).isDirectory());
}
/**
 * Returns a list of available versions for the provided package
 * @param pkg The package to check
 * @returns
 */
export async function getVersions(pkg: string): Promise<string[] | null> {
	try {
		const entries = await readdir(join(DOCS_DIRECTORY, pkg));
		const versions = entries
			.filter((str) => str.endsWith(".json") && str !== "main")
			.reverse()
			.map((str) => str.replace(".json", ""));

		return ["main", ...versions];
	} catch (err) {
		return null;
	}
}
