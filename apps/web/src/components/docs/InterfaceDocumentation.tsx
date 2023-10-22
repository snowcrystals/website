import React from "react";
import type { InterfaceParser, TypeParameterParser } from "typedoc-json-parser";
import { MemberDescription, MemberMethodProperties, MemberProperties, MemberTitle } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParametersString } from "./TypeParameterParsers";
import { PackageMemberParams } from "../../app/docs/[pkg]/[version]/[member]/layout";

interface Props {
	member: InterfaceParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: InterfaceParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = param.constraint ? getTypeParametersString(param.constraint) : null;
		const defaultValue = param.default ? getTypeParametersString(param.default) : null;

		return `${param.name}${constraint ? ` extends ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`;
	};

	const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;
	return `export declare interface ${type.name}${typeParameters ? `<${typeParameters}>` : ""}`;
}

export const InterfaceDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle source={member.source} name={member.name} propertyType={"interfaces"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />

				{Boolean(member.properties.length) && <MemberProperties properties={member.properties} pkg={params.pkg} version={params.version} />}
				{Boolean(member.methods.length) && <MemberMethodProperties properties={member.methods} pkg={params.pkg} version={params.version} />}
			</div>
		</div>
	);
};
