import React from "react";
import type { TypeAliasParser, TypeParameterParser } from "typedoc-json-parser";

import { SyntaxHighlighter } from "@/components/markdown/src/SyntaxHighlighter";

import { MemberDescription, MemberTitle } from "./components";
import { getTypeParametersString } from "./TypeParameterParsers";

interface Props {
	member: TypeAliasParser.Json;
}

function getDeclarationCode(type: TypeAliasParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = param.constraint ? getTypeParametersString(param.constraint) : null;
		const defaultValue = param.default ? getTypeParametersString(param.default) : null;

		return `${param.name}${constraint ? ` extends ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`;
	};

	const typeValue = getTypeParametersString(type.type);
	const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;

	return `export declare type ${type.name}${typeParameters ? `<${typeParameters}>` : ""} = ${typeValue};`;
}

export const TypeAliasDocumentation: React.FC<Props> = ({ member }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle source={member.source} name={member.name} propertyType={"variables"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<MemberDescription comment={member.comment} />
		</div>
	);
};
