import React from "react";
import type { ClassMethodParser, InterfaceMethodParser, ParameterParser, SignatureParser, TypeParameterParser } from "typedoc-json-parser";
import { getIcon } from "../../Icons";
import { getTypeParameter } from "../utils/TypeParameter";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { ReadmeMarkdown } from "@website/markdown";
import { OverloadSwitch } from "../../global";

interface Props {
	properties: (InterfaceMethodParser.Json | ClassMethodParser.Json)[];
}

interface EntryProps {
	property: SignatureParser.Json;
}

const PropertyEntry: React.FC<EntryProps> = ({ property }) => {
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

	const title = `${property.name}${typeParameters.length ? `<${typeParameters}>` : ""}(${parameters}): ${returnType}`;
	const id = `property-${property.name}`;

	return (
		<div className="last-of-type:border-none border-b border-markdown-light dark:border-markdown-dark py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4" />
				</Link>
				<span>{title}</span>
			</h3>
			<div className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
				<ReadmeMarkdown content={property.comment.description ?? ""} fullName="" version="" />
			</div>
			{property.comment.blockTags.map((tag) => (
				<div key={tag.name} className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<ReadmeMarkdown content={tag.text} fullName="" version="" />
				</div>
			))}
		</div>
	);
};

export const MemberMethodProperties: React.FC<Props> = ({ properties }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">{getIcon("functions", 24)} Methods</h2>
			<div className="flex flex-col gap-2">
				{properties.map((property) => (
					<OverloadSwitch
						key={property.id}
						overloads={property.signatures.map((signature) => (
							<PropertyEntry key={signature.name} property={signature} />
						))}
					/>
				))}
			</div>
		</section>
	);
};
