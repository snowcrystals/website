import React from "react";
import type { NamespaceParser } from "typedoc-json-parser";

import { SyntaxHighlighter } from "@/components/markdown/SyntaxHighlighter";

import type { PackageMemberParams } from "../../app/docs/[pkg]/[version]/[member]/layout";
import { MemberDescription, MemberNamespace, MemberTitle } from "./components";

interface Props {
	member: NamespaceParser.Json;
	params: PackageMemberParams;
}

function getDeclarationCode(type: NamespaceParser.Json) {
	return `export declare namespace ${type.name}`;
}

export const NamespaceDocumentation: React.FC<Props> = ({ member, params }) => {
	return (
		<div className="flex flex-col gap-2">
			<MemberTitle source={member.source} name={member.name} propertyType={"namespaces"} />
			<SyntaxHighlighter code={getDeclarationCode(member)} />

			<div className="flex flex-col gap-4">
				<MemberDescription comment={member.comment} />
				{Boolean(member.classes.length) && <MemberNamespace {...params} properties={member.classes} type="classes" />}
				{Boolean(member.functions.length) && <MemberNamespace {...params} properties={member.functions} type="functions" />}
				{Boolean(member.variables.length) && <MemberNamespace {...params} properties={member.variables} type="variables" />}
				{Boolean(member.typeAliases.length) && <MemberNamespace {...params} properties={member.typeAliases} type="typeAliases" />}
				{Boolean(member.interfaces.length) && <MemberNamespace {...params} properties={member.interfaces} type="interfaces" />}
				{Boolean(member.enums.length) && <MemberNamespace {...params} properties={member.enums} type="enums" />}
				{Boolean(member.namespaces.length) && <MemberNamespace {...params} properties={member.namespaces} type="namespaces" />}
			</div>
		</div>
	);
};
