import React from "react";
import type { EnumParser } from "typedoc-json-parser";

import { SyntaxHighlighter } from "@/components/markdown/SyntaxHighlighter";

import type { PackageMemberParams } from "../../app/docs/[pkg]/[version]/[member]/layout";
import { MemberDescription, MemberEnums, MemberTitle } from "./components";

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
			<MemberTitle source={member.source} name={member.name} propertyType={"enums"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />
			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				<MemberEnums members={member.members} pkg={params.pkg} version={params.version} />
			</div>
		</div>
	);
};
