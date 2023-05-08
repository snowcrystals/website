import axios from "axios";
import { ProjectParser } from "typedoc-json-parser";
const BASE_URL = "https://docs.snowcrystals.dev/api" as const;

export const getPackageData = async (pkg: string, version: string) => {
	try {
		const request = await axios.get(`${BASE_URL}/?package=${pkg}&version=${version}`);
		const parser = new ProjectParser({ data: request.data });

		return parser;
	} catch (err) {
		return null;
	}
};
