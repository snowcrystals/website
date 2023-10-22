import React from "react";
import type { ClassConstructorParser, ParameterParser } from "typedoc-json-parser";
import { getTypeParametersString, getTypeParametersJsx } from "../TypeParameterParsers";
import { ReadmeMarkdown } from "@website/markdown";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getIcon } from "@/components/NavigationSidebar/PropertyIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@website/ui/table";
import { JetBrains_Mono } from "next/font/google";

interface Props {
	construct: ClassConstructorParser.Json;
	pkg: string;
	version: string;
}

interface TableEntryProps {
	param: ParameterParser.Json;
	pkg: string;
	version: string;
}

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap"
});

const TableEntry: React.FC<TableEntryProps> = ({ param, pkg, version }) => {
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

export const MemberConstructor: React.FC<Props> = ({ construct, pkg, version }) => {
	function getDeclarationCode(type: ClassConstructorParser.Json) {
		const getTypeParameterSection = (param: ParameterParser.Json) => {
			const typeValue = getTypeParametersString(param.type);
			const optional = param.optional ? "?" : "";
			const rest = param.rest ? "..." : "";

			return `${rest}${param.name}${optional}: ${typeValue}`;
		};

		return `constructor(${type.parameters.map(getTypeParameterSection).join(", ")}): this;`;
	}

	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">{getIcon("functions", 24)} Constructor</h2>
			<SyntaxHighlighter code={getDeclarationCode(construct)} />

			{construct.comment.description && (
				<ReadmeMarkdown content={construct.comment.description} fullName={`snowcrystals/${pkg}`} version={version} />
			)}

			{construct.comment.blockTags.map((tag) => (
				<div key={tag.name} className="mt-1">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<div style={jetBrainsMono.style} className="[&>.markdown]:px-0">
						<ReadmeMarkdown content={tag.text} fullName={`snowcrystals/${pkg}`} version={version} />
					</div>
				</div>
			))}

			<div className="overflow-x-auto mb-4">
				<h4 className="font-semibold text-4">Paramaters</h4>
				<Table>
					<TableHeader>
						<TableRow>
							{["name", "type", "optional", "description"].map((key) => (
								<TableHead key={key}>{key}</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody>
						{construct.parameters.map((param) => (
							<TableEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
};
