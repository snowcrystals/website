import React from "react";
import type { InterfaceParser, TypeParameterParser } from "typedoc-json-parser";
import { MemberDescription, MemberMethodProperties, MemberProperties, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParameter } from "./utils/TypeParameter";

interface Props {
	member: InterfaceParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: InterfaceParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = getTypeParameter(param.constraint);
		const defaultValue = getTypeParameter(param.default);

		return `${param.name}${constraint ? ` extends ${constraint.value}` : ""}${defaultValue ? ` = ${defaultValue.value}` : ""}`;
	};

	const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;
	return `export declare interface ${type.name}${typeParameters ? `<${typeParameters}>` : ""}`;
}

export const InterfaceDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle params={params} source={member.source} name={member.name} propertyType={"interfaces"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				{member.properties.length ? <MemberProperties properties={member.properties} pkg={params.package} version={params.version} /> : null}
				{member.methods.length ? <MemberMethodProperties properties={member.methods} /> : null}
			</div>
		</div>
	);
};
