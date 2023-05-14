import React from "react";
import type { EnumParser } from "typedoc-json-parser";
import { MemberDescription, MemberEnums, MemberTitle, type PackageMemberParams } from "./components";
import { SyntaxHighlighter } from "@website/markdown/src/SyntaxHighlighter";

interface Props {
	member: EnumParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: EnumParser.Json) {
	return `export declare enum ${type.name}`;
}

export const EnumDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle params={params} source={member.source} name={member.name} propertyType={"enums"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				<MemberEnums members={member.members} pkg={params.package} version={params.version} />
			</div>
		</div>
	);
};
