import React from "react";
import { PackageMemberParams } from "./layout";
import { notFound } from "next/navigation";
import { getPackageDocumentation } from "@/lib/docs";
import {
	ClassParser,
	EnumParser,
	FunctionParser,
	InterfaceParser,
	NamespaceParser,
	ProjectParser,
	SearchResult,
	TypeAliasParser,
	VariableParser
} from "typedoc-json-parser";
import { ClassDocumentation } from "@/components/docs/ClassDocumentation";
import { VariableDocumentation } from "@/components/docs/VariableDocumentation";
import { TypeAliasDocumentation } from "@/components/docs/TypeAliasDocumentation";
import { InterfaceDocumentation } from "@/components/docs/InterfaceDocumentation";
import { EnumDocumentation } from "@/components/docs/EnumDocumentation";
import { OverloadSwitch } from "@/components/docs/OverloadSwitch";
import { FunctionDocumentation } from "@/components/docs/FunctionDocumentation";
import { NamespaceDocumentation } from "@/components/docs/NamespaceDocumentation";

function getComponent(member: SearchResult, params: PackageMemberParams) {
	function getType(result: any): "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces" | null {
		if (result instanceof ClassParser) return "classes";
		else if (result instanceof EnumParser) return "enums";
		else if (result instanceof VariableParser) return "variables";
		else if (result instanceof TypeAliasParser) return "typeAliases";
		else if (result instanceof InterfaceParser) return "interfaces";
		else if (result instanceof FunctionParser) return "functions";
		else if (result instanceof NamespaceParser) return "namespaces";

		return null;
	}

	switch (getType(member)) {
		case "functions": {
			const overloads = (member as any).signatures.map((signature: any, key: number) => (
				<FunctionDocumentation key={key} member={member as any} overload={signature} params={params} />
			));

			return <OverloadSwitch overloads={overloads} />;
		}
		case "variables":
			return <VariableDocumentation member={member as any} />;
		case "typeAliases":
			return <TypeAliasDocumentation member={member as any} />;
		case "interfaces":
			return <InterfaceDocumentation member={member as any} params={params} />;
		case "classes":
			return <ClassDocumentation member={member as any} params={params} />;
		case "enums":
			return <EnumDocumentation member={member as any} params={params} />;
		case "namespaces":
			return <NamespaceDocumentation member={member as any} params={params} />;
		default:
			return null;
	}
}

/**
 * Gets the package member details
 * @param project The project documentation
 * @param input The element
 * @returns
 */
function getPackageMember(project: ProjectParser.Json, input: string) {
	const [name, id] = input.split(":");

	const parser = new ProjectParser({ data: project });
	const result = parser.find(Number(id)) || parser.search(name).find((res) => res.id === Number(id));
	return result || null;
}

const Page: React.FC<{ params: PackageMemberParams }> = async ({ params }) => {
	const project = await getPackageDocumentation(params.pkg, params.version);
	if (!project) notFound();

	const member = getPackageMember(project, decodeURIComponent(params.member));
	if (!member) notFound();

	const component = getComponent(member, params);
	if (!component) notFound();

	return <main className="px-4 [&>.markdown]:px-0 min-h-screen">{component}</main>;
};

export default Page;
