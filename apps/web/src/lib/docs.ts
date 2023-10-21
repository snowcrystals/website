import { readdir } from "node:fs/promises";
import { DOCS_DIRECTORY } from "./constants";
import { statSync } from "node:fs";
import { join } from "node:path";

/** Returns a list of packages with documentation */
export async function getPackages() {
	const entries = await readdir(DOCS_DIRECTORY);
	return entries.filter((str) => statSync(join(DOCS_DIRECTORY, str)).isDirectory());
}
