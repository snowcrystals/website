import React from "react";
import type { ClassParser, TypeParameterParser } from "typedoc-json-parser";

import { SyntaxHighlighter } from "@/components/markdown/src/SyntaxHighlighter";

import type { PackageMemberParams } from "../../app/docs/[pkg]/[version]/[member]/layout";
import { MemberConstructor, MemberDescription, MemberMethodProperties, MemberProperties, MemberTitle } from "./components";
import { getTypeParametersString } from "./TypeParameterParsers";

interface Props {
	member: ClassParser.Json;
	params: PackageMemberParams;
}

export const ClassDocumentation: React.FC<Props> = ({ member, params }) => {
	function getDeclarationCode(type: ClassParser.Json) {
		const getTypeParameterSection = (param: TypeParameterParser.Json) => {
			const constraint = param.constraint ? getTypeParametersString(param.constraint) : null;
			const defaultValue = param.default ? getTypeParametersString(param.default) : null;

			return `${param.name}${constraint ? ` extends ${constraint}` : ""}${defaultValue ? ` = ${defaultValue}` : ""}`;
		};

		const typeParameters = type.typeParameters.length ? type.typeParameters.map(getTypeParameterSection).join(", ") : null;
		const extendsType = type.extendsType ? ` extends ${getTypeParametersString(type.extendsType)}` : "";
		const implementsType = type.implementsType.length ? ` implements ${type.implementsType.map(getTypeParametersString).join(", ")}` : "";

		return `export declare class ${type.name}${typeParameters ? `<${typeParameters}>` : ""}${extendsType}${implementsType}`;
	}

	return (
		<div className="flex flex-col gap-2">
			<MemberTitle source={member.source} name={member.name} propertyType="classes" />
			<SyntaxHighlighter code={getDeclarationCode(member)} />

			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				<MemberConstructor construct={member.construct} pkg={params.pkg} version={params.version} />

				{Boolean(member.properties.length) && <MemberProperties properties={member.properties} pkg={params.pkg} version={params.version} />}
				{Boolean(member.methods.length) && <MemberMethodProperties properties={member.methods} pkg={params.pkg} version={params.version} />}
			</div>
		</div>
	);
};
