import axios from "axios";
import { ProjectParser, SourceParser } from "typedoc-json-parser";
const BASE_URL = "https://docs.snowcrystals.dev/api" as const;

export type iSource = SourceParser.Json;

/**
 * Retrieves and parses the package documentation data
 * @param pkg The package you want to parse
 * @param version The version you want to parse
 */
export const getPackageData = async (pkg: string, version: string) => {
	try {
		const request = await axios.get(`${BASE_URL}/?package=${pkg}&version=${version}`);
		const parser = new ProjectParser({ data: request.data });

		return parser;
	} catch (err) {
		return null;
	}
};

/**
 * Returns a list of packages the user can choose from
 */
export const getPackages = async (): Promise<string[]> => {
	try {
		const request = await axios.get<string[]>(`${BASE_URL}/packages`);
		return request.data;
	} catch (err) {
		return [];
	}
};

/**
 * Returns a list of versions for the provided the user can choose from
 * @param pkg The package you want to get the versions from
 */
export const getVersions = async (pkg: string): Promise<string[]> => {
	try {
		const request = await axios.get<string[]>(`${BASE_URL}/versions?package=${pkg}`);
		return request.data;
	} catch (err) {
		return [];
	}
};
