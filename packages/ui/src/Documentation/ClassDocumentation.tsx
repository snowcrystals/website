import React from "react";
import type { ClassParser, TypeParameterParser } from "typedoc-json-parser";
import { MemberDescription, MemberMethodProperties, MemberProperties, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";
import { getTypeParameter } from "./utils/TypeParameter";

interface Props {
	member: ClassParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: ClassParser.Json) {
	const getTypeParameterSection = (param: TypeParameterParser.Json) => {
		const constraint = getTypeParameter(param.constraint);
		const defaultValue = getTypeParameter(param.default);

		return `${param.name}${constraint ? ` extends ${constraint.value}` : ""}${defaultValue ? ` = ${defaultValue.value}` : ""}`;
	};

	const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;
	const extendsType = type.extendsType ? ` extends ${getTypeParameter(type.extendsType)!.value}` : "";
	const implementsType = type.implementsType.length
		? ` implements ${type.implementsType
				.map(getTypeParameter)
				.map((type) => type!.value)
				.join(", ")}`
		: "";

	return `export declare class ${type.name}${typeParameters ? `<${typeParameters}>` : ""}${extendsType}${implementsType}`;
}

export const ClassDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle params={params} source={member.source} name={member.name} propertyType={"classes"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				{member.properties.length ? <MemberProperties properties={member.properties} pkg={params.package} version={params.version} /> : null}
				{member.methods.length ? <MemberMethodProperties properties={member.methods} pkg={params.package} version={params.version} /> : null}
			</div>
		</div>
	);
};
