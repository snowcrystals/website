import React from "react";
import type { TypeParameterParser } from "typedoc-json-parser";

import { ParameterIcon } from "@/components/ui/icons/parameter-icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { getTypeParametersJsx } from "../TypeParameterParsers";

interface Props {
	parameters: TypeParameterParser.Json[];
	version: string;
	pkg: string;
}

interface EntryProps {
	param: TypeParameterParser.Json;
	version: string;
	pkg: string;
}

const TypeParameterEntry: React.FC<EntryProps> = ({ param, pkg, version }) => {
	const defaultValue = param.default ? getTypeParametersJsx(param.default, pkg, version) : null;
	const constraint = param.constraint ? getTypeParametersJsx(param.constraint, pkg, version) : null;

	return (
		<TableRow>
			<TableCell>{param.name}</TableCell>
			<TableCell>{constraint}</TableCell>
			<TableCell>{param.default ? "Yes" : "No"}</TableCell>
			<TableCell>{defaultValue || "-"}</TableCell>
		</TableRow>
	);
};

export const MemberTypeParameters: React.FC<Props> = ({ parameters, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<ParameterIcon size={24} /> Type Parameters
			</h2>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							{["name", "Constraint", "optional", "default"].map((key) => (
								<TableHead key={key}>{key}</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody>
						{parameters.map((param) => (
							<TypeParameterEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
};
