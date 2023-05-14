import React from "react";
import type { ParameterParser } from "typedoc-json-parser";
import { ParameterIcon } from "../../Icons";
import { getTypeParametersReact } from "../utils/TypeParameter";

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
	const typeValue = getTypeParametersReact(param.type, pkg, version);

	return (
		<tr className="[&>td]:last-of-type:border-0">
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{param.rest && "..."}
				{param.name}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{typeValue}
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

export const MemberParameters: React.FC<Props> = ({ parameters, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<ParameterIcon size={24} /> Parameters
			</h2>
			<div className="overflow-x-auto">
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
						{parameters.map((param) => (
							<ParamEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
