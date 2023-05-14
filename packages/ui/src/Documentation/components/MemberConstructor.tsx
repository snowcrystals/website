import React from "react";
import type { ClassConstructorParser, ParameterParser } from "typedoc-json-parser";
import { getIcon } from "../../Icons";
import { getTypeParameter } from "../utils/TypeParameter";
import Link from "next/link";
import { ReadmeMarkdown } from "@website/markdown";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";

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

function getDeclarationCode(type: ClassConstructorParser.Json) {
	const getTypeParameterSection = (param: ParameterParser.Json) => {
		const typeValue = getTypeParameter(param.type);
		const optional = param.optional ? "?" : "";
		const rest = param.rest ? "..." : "";

		return `${rest}${param.name}${optional}: ${typeValue!.value}`;
	};

	return `constructor(${type.parameters.map(getTypeParameterSection).join(", ")}): this;`;
}

export const MemberConstructor: React.FC<Props> = ({ construct, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">{getIcon("functions", 24)} Constructor</h2>
			<SyntaxHighlighter code={getDeclarationCode(construct)} />
			{construct.comment.description && (
				<ReadmeMarkdown content={construct.comment.description} fullName={`snowcrystals/${pkg}`} version={version} />
			)}
			{construct.comment.blockTags.map((tag) => (
				<div key={tag.name} className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<ReadmeMarkdown content={tag.text} fullName={`snowcrystals/${pkg}`} version={version} />
				</div>
			))}
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
						{construct.parameters.map((param) => (
							<TableEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
