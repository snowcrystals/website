import React from "react";
import type { TypeParameterParser } from "typedoc-json-parser";
import { ParameterIcon } from "../../Icons";
import { getTypeParameter } from "../utils/TypeParameter";
import Link from "next/link";

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
	const defaultValue = getTypeParameter(param.default);
	const constraint = getTypeParameter(param.constraint);

	return (
		<tr className="[&>td]:last-of-type:border-0">
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{param.name}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{constraint ? (
					constraint.external ? (
						constraint.value
					) : (
						<Link className="text-primary" href={`/docs/${pkg}/${version}/${constraint.name}:${constraint.id}`}>
							{constraint.value}
						</Link>
					)
				) : null}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 capitalize font-mono break-words leading-relaxed">
				{param.default ? "Yes" : "No"}
			</td>
			<td className="border-b dark:border-markdown-dark border-markdown-light px-3 py-2 text-left text-4 font-mono break-words leading-relaxed">
				{defaultValue ? (
					defaultValue.external ? (
						defaultValue.value
					) : (
						<Link className="text-primary" href={`/docs/${pkg}/${version}/${defaultValue.name}:${defaultValue.id}`}>
							{defaultValue.value}
						</Link>
					)
				) : null}
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
