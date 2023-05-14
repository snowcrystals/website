import React from "react";
import type { ClassMethodParser, InterfaceMethodParser, ParameterParser, SignatureParser, TypeParameterParser } from "typedoc-json-parser";
import { getIcon } from "../../Icons";
import { getTypeParameter } from "../utils/TypeParameter";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { ReadmeMarkdown } from "@website/markdown";
import { OverloadSwitch } from "../../global";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";

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
	const typeValue = getTypeParameter(param.type);

	return (
		<tr className="[&>td]:last-of-type:border-0">
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{param.rest && "..."}
				{param.name}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{typeValue ? (
					typeValue.external ? (
						typeValue.value
					) : (
						<Link className="text-primary" href={`/docs/${pkg}/${version}/${typeValue.name}:${typeValue.id}`}>
							{typeValue.value}
						</Link>
					)
				) : null}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 capitalize font-mono break-words leading-relaxed">
				{param.optional ? "Yes" : "No"}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{param.comment.description ?? "N/A"}
			</td>
		</tr>
	);
};

const PropertyEntry: React.FC<EntryProps> = ({ property, member, pkg, version }) => {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = getTypeParameter(param.constraint);
		const defaultValue = getTypeParameter(param.default);

		return `${param.name}${constraint ? ` extends ${constraint.value}` : ""}${defaultValue ? ` = ${defaultValue.value}` : ""}`;
	};

	const getTypeSection = (param: ParameterParser.Json) => {
		const type = getTypeParameter(param.type)!;
		return `${param.rest ? "..." : ""}${param.name}${param.optional ? "?" : ""}: ${type.value}`;
	};

	const parameters = property.parameters.map(getTypeSection).join(", ");
	const typeParameters = property.typeParameters.map(getTypeParameterSection).join(", ");
	const returnType = getTypeParameter(property.returnType)!.value;

	const accessibility = "accessibility" in member ? `${member.accessibility} ` : "";
	const abstractFlag = "abstract" in member && member.abstract ? "abstract " : "";
	const staticFlag = "static" in member && member.static ? "static " : "";
	const flags = [staticFlag, abstractFlag, accessibility].filter(Boolean);

	const title = `function ${property.name}${typeParameters.length ? `<${typeParameters}>` : ""}(${parameters}): ${returnType}`;
	const id = `method-${property.name.toLowerCase()}`;

	return (
		<div className="border-b border-markdown-light dark:border-markdown-dark py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4" />
				</Link>
				<span>
					{property.name}(
					{property.parameters.map((param) => `${param.rest ? "..." : ""}${param.name}${param.optional ? "?" : ""}`).join(", ")})
				</span>
			</h3>
			<div className="flex items-center gap-2 mt-3">
				{flags.map((flag) => (
					<span key={flag} className="bg-primary rounded-full px-4 py-2">
						{flag}
					</span>
				))}
			</div>
			<SyntaxHighlighter code={title} />
			{Boolean(property.parameters.length) && (
				<div className="overflow-x-auto mb-4">
					<h4 className="font-semibold text-4">Paramaters</h4>
					<table className="w-full border-collapse">
						<thead>
							<tr>
								{["name", "type", "optional", "description"].map((head) => (
									<th
										key={head}
										className="break-normal border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 capitalize"
									>
										{head}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{property.parameters.map((param) => (
								<TableEntry key={param.name} param={param} pkg={pkg} version={version} />
							))}
						</tbody>
					</table>
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
