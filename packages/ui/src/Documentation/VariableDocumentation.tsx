import React from "react";
import type { VariableParser } from "typedoc-json-parser";
import { MemberDescription, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParametersString } from "./utils/TypeParameter";

interface Props {
	member: VariableParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(variable: VariableParser.Json) {
	const type = getTypeParametersString(variable.type);
	const _value = variable.value.replace("...", "");
	const hasValue = Boolean(_value.length);

	const value = hasValue ? ` = ${_value};` : "";
	return `${hasValue ? "export const" : "export declare const"} ${variable.name}: ${type}${value};`;
}

export const VariableDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-4">
			<MemberTitle params={params} source={member.source} name={member.name} propertyType={"variables"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<MemberDescription comment={member.comment} />
		</div>
	);
};
