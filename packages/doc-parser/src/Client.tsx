import axios from "axios";
import type {
	ClassConstructorParser,
	ClassMethodParser,
	ClassParser,
	ClassPropertyParser,
	EnumMemberParser,
	EnumParser,
	FunctionParser,
	InterfaceParser,
	InterfacePropertyParser,
	NamespaceParser,
	ParameterParser,
	SignatureParser,
	TypeAliasParser,
	TypeParameterParser,
	VariableParser
} from "typedoc-json-parser";
const BASE_URL = "https://docs.snowcrystals.dev/api" as const;

export type SearchResult =
	| ClassParser.Json
	| ClassConstructorParser.Json
	| ClassMethodParser.Json
	| SignatureParser.Json
	| TypeParameterParser.Json
	| ParameterParser.Json
	| ClassPropertyParser.Json
	| VariableParser.Json
	| EnumParser.Json
	| EnumMemberParser.Json
	| FunctionParser.Json
	| InterfaceParser.Json
	| InterfacePropertyParser.Json
	| NamespaceParser.Json
	| TypeAliasParser.Json;
export type JsonSearchResult = SearchResult & {
	propertyType: "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces";
};

export type PackageDataParsers =
	| ClassParser.Json
	| TypeAliasParser.Json
	| EnumParser.Json
	| VariableParser.Json
	| InterfaceParser.Json
	| FunctionParser.Json
	| NamespaceParser.Json;

export type PackageDataResult = PackageDataParsers & {
	propertyType: "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces";
};

/**
 * Returns a list of search results
 * @param pkg The package you want to get the versions from
 * @param version The package version
 * @param query The search query
 */
export const packageSearch = async (pkg: string, version: string, query: string): Promise<JsonSearchResult[]> => {
	try {
		const request = await axios.get<JsonSearchResult[]>(
			`${BASE_URL}/search?package=${pkg}&version=${version}&query=${encodeURIComponent(query)}`
		);
		return request.data;
	} catch (err) {
		return [];
	}
};

/**
 * Retrieves and parses the package documentation data
 * @param pkg The package you want to parse
 * @param version The version you want to parse
 * @param member The member you want to get the information of
 */
export const getPackageMemberData = async (pkg: string, version: string, member: string): Promise<PackageDataResult | null> => {
	try {
		const request = await axios.get(`${BASE_URL}/info?package=${pkg}&version=${version}&member=${member}`);
		return request.data;
	} catch (err) {
		return null;
	}
};
