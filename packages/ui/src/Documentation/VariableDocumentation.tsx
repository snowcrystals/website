import React from "react";
import type { VariableParser } from "typedoc-json-parser";
import { MemberDescription, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParameter } from "./utils/TypeParameter";

interface Props {
	member: VariableParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(variable: VariableParser.Json) {
	const type = getTypeParameter(variable.type)!.value;
	const value = variable.value.length ? `= ${variable.value};` : "";

	return `${variable.name}: ${type}${value}`;
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
