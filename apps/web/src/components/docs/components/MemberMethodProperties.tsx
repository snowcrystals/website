import React from "react";
import type { ClassMethodParser, InterfaceMethodParser, ParameterParser, SignatureParser, TypeParameterParser } from "typedoc-json-parser";
import Link from "next/link";
import { ReadmeMarkdown } from "@website/markdown";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParametersJsx, getTypeParametersString } from "../TypeParameterParsers";
import { LinkIcon } from "lucide-react";
import { OverloadSwitch } from "../OverloadSwitch";
import { getIcon } from "@/components/NavigationSidebar/PropertyIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@website/ui/table";

interface Props {
	properties: (InterfaceMethodParser.Json | ClassMethodParser.Json)[];
	pkg: string;
	version: string;
}

interface EntryProps {
	property: SignatureParser.Json;
	member: InterfaceMethodParser.Json | ClassMethodParser.Json;
	pkg: string;
	version: string;
}

interface TableEntryProps {
	param: ParameterParser.Json;
	pkg: string;
	version: string;
}

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

const PropertyEntry: React.FC<EntryProps> = ({ property, member, pkg, version }) => {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = param.constraint ? getTypeParametersString(param.constraint) : null;
		const defaultValue = param.default ? getTypeParametersString(param.default) : null;

		return `${param.name}${constraint ? ` extends ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`;
	};

	const getTypeSection = (param: ParameterParser.Json) => {
		const type = getTypeParametersString(param.type)!;
		return `${param.rest ? "..." : ""}${param.name}${param.optional ? "?" : ""}: ${type}`;
	};

	const parameters = property.parameters.map(getTypeSection).join(", ");
	const typeParameters = property.typeParameters.map(getTypeParameterSection).join(", ");
	const returnType = getTypeParametersString(property.returnType);

	const accessibility = "accessibility" in member ? member.accessibility : "";
	const abstractFlag = "abstract" in member && member.abstract ? "abstract" : "";
	const staticFlag = "static" in member && member.static ? "static" : "";
	const flags = [staticFlag, abstractFlag, accessibility].filter(Boolean).filter((flag) => flag !== "public");

	const title = `function ${property.name}${typeParameters.length ? `<${typeParameters}>` : ""}(${parameters}): ${returnType}`;
	const id = `method-${property.name.toLowerCase()}`;

	return (
		<div className="border-b border-muted py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4" />
				</Link>
				<span>
					{property.name}(
					{property.parameters.map((param) => `${param.rest ? "..." : ""}${param.name}${param.optional ? "?" : ""}`).join(", ")})
				</span>
			</h3>

			{Boolean(flags.length) && (
				<div className="flex items-center gap-2 mt-3">
					{flags.map((flag) => (
						<span key={flag} className="bg-primary rounded-full px-4 py-2">
							{flag}
						</span>
					))}
				</div>
			)}

			<SyntaxHighlighter code={title} />

			{Boolean(property.parameters.length) && (
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
							{property.parameters.map((param) => (
								<TableEntry key={param.name} param={param} pkg={pkg} version={version} />
							))}
						</TableBody>
					</Table>
				</div>
			)}

			<div className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
				<h4 className="text-4 font-semibold">Description</h4>
				<ReadmeMarkdown content={property.comment.description ?? ""} fullName={pkg} version={version} />
			</div>

			<div className="flex flex-col gap-1">
				{property.comment.blockTags.map((tag) => (
					<div key={tag.name} className="[&>div.markdown]:!font-mono [&>div.markdown]:px-0">
						<h3 className="font-semibold text-4">{tag.name}</h3>
						<ReadmeMarkdown content={tag.text} fullName={pkg} version={version} />
					</div>
				))}
			</div>
		</div>
	);
};

export const MemberMethodProperties: React.FC<Props> = ({ properties, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">{getIcon("functions", 24)} Methods</h2>
			<div className="flex flex-col gap-2">
				{properties.map((property) => (
					<OverloadSwitch
						key={property.id}
						overloads={property.signatures.map((signature) => (
							<PropertyEntry key={signature.name} property={signature} member={property} pkg={pkg} version={version} />
						))}
					/>
				))}
			</div>
		</section>
	);
};
