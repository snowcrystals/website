import React from "react";
import type { ParameterParser } from "typedoc-json-parser";

import { ParameterIcon } from "@/components/ui/icons/parameter-icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { getTypeParametersJsx } from "../TypeParameterParsers";

interface Props {
	parameters: ParameterParser.Json[];
	pkg: string;
	version: string;
}

interface EntryProps {
	param: ParameterParser.Json;
	pkg: string;
	version: string;
}

const ParamEntry: React.FC<EntryProps> = ({ param, pkg, version }) => {
	const typeValue = getTypeParametersJsx(param.type, pkg, version);

	return (
		<TableRow>
			<TableCell>
				{param.rest && "..."}
				{param.name}
			</TableCell>
			<TableCell>{typeValue}</TableCell>
			<TableCell>{param.optional ? "Yes" : "No"}</TableCell>
			<TableCell>{param.comment.description || "-"}</TableCell>
		</TableRow>
	);
};

export const MemberParameters: React.FC<Props> = ({ parameters, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<ParameterIcon size={24} /> Parameters
			</h2>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							{["name", "type", "optional", "description"].map((key) => (
								<TableHead key={key}>{key}</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody>
						{parameters.map((param) => (
							<ParamEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
};
