import React from "react";
import type { FunctionParser, ParameterParser, SignatureParser, TypeParameterParser } from "typedoc-json-parser";
import { MemberDescription, MemberParameters, MemberTitle, MemberTypeParameters } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParametersString } from "./TypeParameterParsers";
import { PackageMemberParams } from "../../app/docs/[pkg]/[version]/[member]/layout";

interface Props {
	overload: SignatureParser.Json;
	member: FunctionParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(overload: SignatureParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = param.constraint ? getTypeParametersString(param.constraint) : null;
		const defaultValue = param.default ? getTypeParametersString(param.default) : null;

		return `${param.name}${constraint ? ` extends ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`;
	};

	const getTypeSection = (param: ParameterParser.Json) => {
		const type = getTypeParametersString(param.type)!;
		return `${param.name}${param.optional ? "?" : ""}: ${param.rest ? "..." : ""}${type}`;
	};

	const typeParams = overload.typeParameters.map(getTypeParameterSection).join(", ");
	const params = overload.parameters.map(getTypeSection).join(", ");
	const returnType = getTypeParametersString(overload.returnType)!;

	return `export declare function ${overload.name}${typeParams.length ? `<${typeParams}>` : ""}(${params}): ${returnType}`;
}

export const FunctionDocumentation: React.FC<Props> = ({ member, overload, params }) => {
	return (
		<div className="flex flex-col gap-4">
			<MemberTitle source={member.source} name={overload.name} propertyType={"functions"} />
			<SyntaxHighlighter code={getDeclarationCode(overload)} />
			<MemberDescription comment={overload.comment} />
			<MemberTypeParameters parameters={overload.typeParameters} pkg={params.pkg} version={params.version} />
			<MemberParameters parameters={overload.parameters} pkg={params.pkg} version={params.version} />
		</div>
	);
};
