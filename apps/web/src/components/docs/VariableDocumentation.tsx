import React from "react";
import type { VariableParser } from "typedoc-json-parser";

import { SyntaxHighlighter } from "@/components/markdown/SyntaxHighlighter";

import { MemberDescription, MemberTitle } from "./components";
import { getTypeParametersString } from "./TypeParameterParsers";

interface Props {
	member: VariableParser.Json;
}

function getDeclarationCode(variable: VariableParser.Json) {
	const type = getTypeParametersString(variable.type);
	const _value = variable.value.replace("...", "");
	const hasValue = Boolean(_value.length);

	const value = hasValue ? ` = ${_value};` : "";
	return `${hasValue ? "export const" : "export declare const"} ${variable.name}: ${type}${value};`;
}

export const VariableDocumentation: React.FC<Props> = ({ member }) => {
	return (
		<div className="flex flex-col gap-4">
			<MemberTitle source={member.source} name={member.name} propertyType={"variables"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<MemberDescription comment={member.comment} />
		</div>
	);
};
