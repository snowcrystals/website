import { readFile, readdir } from "node:fs/promises";
import { DOCS_DIRECTORY } from "./constants";
import { statSync } from "node:fs";
import { join } from "node:path";
import type { ProjectParser } from "typedoc-json-parser";

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
		const packages = await getPackages();
		if (!packages.includes(pkg)) return null;

		const entries = await readdir(join(DOCS_DIRECTORY, pkg));
		const versions = entries
			.filter((str) => str.endsWith(".json"))
			.map((str) => str.replace(".json", ""))
			.filter((str) => str !== "main")
			.reverse();

		return ["main", ...versions];
	} catch (err) {
		return null;
	}
}

/**
 * Returns the documentation for a package
 * @param pkg The package to get the docs from
 * @param version The release version
 * @returns
 */
export async function getPackageDocumentation(pkg: string, version: string) {
	try {
		const packages = await getPackages();
		if (!packages.includes(pkg)) return null;

		const versions = await getVersions(pkg);
		if (!versions || !versions.includes(version)) return null;

		const data = await readFile(join(DOCS_DIRECTORY, pkg, `${version}.json`), "utf-8");
		return JSON.parse(data) as ProjectParser.Json;
	} catch (err) {
		return null;
	}
}
