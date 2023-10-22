import { BASE_API_ROUTE } from "./constants";
import type { ProjectParser, SearchResult } from "typedoc-json-parser";

/** Returns a list of packages with documentation */
export async function getPackages() {
	try {
		const response = await fetch(`${BASE_API_ROUTE}/packages`);
		const entries = (await response.json()) as string[];

		return entries;
	} catch (err) {
		return [];
	}
}
/**
 * Returns a list of available versions for the provided package
 * @param pkg The package to check
 * @returns
 */
export async function getVersions(pkg: string): Promise<string[] | null> {
	try {
		const response = await fetch(`${BASE_API_ROUTE}/versions?package=${pkg}`);
		const entries = (await response.json()) as string[];
		const versions = entries.filter((str) => str !== "main").reverse();

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
		const response = await fetch(`${BASE_API_ROUTE}?package=${pkg}&version=${version}`);
		return (await response.json()) as ProjectParser.Json;
	} catch (err) {
		return null;
	}
}

/**
 * Gets the package member details
 * @param pkg The package to get the docs from
 * @param version The release version
 * @param input The element
 * @returns
 */
export async function getPackageMember(pkg: string, version: string, input: string) {
	try {
		const response = await fetch(`${BASE_API_ROUTE}/info?package=${pkg}&version=${version}&member=${input}`);
		return (await response.json()) as ReturnType<SearchResult["toJSON"]> & {
			propertyType: "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces";
		};
	} catch (err) {
		return null;
	}
}
