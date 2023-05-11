import axios from "axios";
import type { SearchResult } from "typedoc-json-parser";
const BASE_URL = "https://docs.snowcrystals.dev/api" as const;

export type JsonSearchResult = Omit<SearchResult, "toJSON">[];

/**
 * Returns a list of search results
 * @param pkg The package you want to get the versions from
 * @param version The package version
 * @param query The search query
 */
export const packageSearch = async (pkg: string, version: string, query: string): Promise<JsonSearchResult> => {
	try {
		const request = await axios.get<JsonSearchResult>(`${BASE_URL}/search?package=${pkg}&version=${version}&query=${encodeURIComponent(query)}`);
		return request.data;
	} catch (err) {
		return [];
	}
};
