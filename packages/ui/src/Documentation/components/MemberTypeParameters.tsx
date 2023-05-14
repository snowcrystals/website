import React from "react";
import type { TypeParameterParser } from "typedoc-json-parser";
import { ParameterIcon } from "../../Icons";
import { getTypeParametersReact } from "../utils/TypeParameter";

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
	const defaultValue = param.default ? getTypeParametersReact(param.default, pkg, version) : null;
	const constraint = param.constraint ? getTypeParametersReact(param.constraint, pkg, version) : null;

	return (
		<tr className="[&>td]:last-of-type:border-0">
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{param.name}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{constraint}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 capitalize font-mono break-words leading-relaxed">
				{param.default ? "Yes" : "No"}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{defaultValue}
			</td>
		</tr>
	);
};

export const MemberTypeParameters: React.FC<Props> = ({ parameters, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<ParameterIcon size={24} /> Type Parameters
			</h2>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr>
							{["name", "Constraint", "optional", "default"].map((head) => (
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
							<TypeParameterEntry key={param.name} param={param} pkg={pkg} version={version} />
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};
