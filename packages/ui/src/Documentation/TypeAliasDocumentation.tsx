import React from "react";
import type { TypeAliasParser, TypeParameterParser } from "typedoc-json-parser";
import { MemberDescription, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParameter } from "./utils/TypeParameter";

interface Props {
	member: TypeAliasParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: TypeAliasParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = getTypeParameter(param.constraint);
		const defaultValue = getTypeParameter(param.default);

		return `${param.name}${constraint ? ` extends ${constraint.value}` : ""}${defaultValue ? ` = ${defaultValue.value}` : ""}`;
	};

	const typeValue = getTypeParameter(type.type)!.value;
	const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;

	return `export declare type ${type.name}${typeParameters ? `<${typeParameters}>` : ""} = ${typeValue};`;
}

export const TypeAliasDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle params={params} source={member.source} name={member.name} propertyType={"variables"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<MemberDescription comment={member.comment} />
		</div>
	);
};
