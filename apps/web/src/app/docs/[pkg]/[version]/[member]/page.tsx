import React from "react";
import { PackageMemberParams } from "./layout";
import { notFound } from "next/navigation";
import { getPackageDocumentation } from "@/lib/docs";
import { ProjectParser } from "typedoc-json-parser";

// function getComponent(member: PackageDataResult, params: PackageMemberParams) {
// 	switch (member.propertyType) {
// 		case "functions": {
// 			const overloads = (member as any).signatures.map((signature: any, key: number) => (
// 				<FunctionDocumentation key={key} member={member as any} overload={signature} params={params} />
// 			));

// 			return <OverloadSwitch overloads={overloads} />;
// 		}
// 		case "variables":
// 			return <VariableDocumentation member={member as any} params={params} />;
// 		case "typeAliases":
// 			return <TypeAliasDocumentation member={member as any} params={params} />;
// 		case "interfaces":
// 			return <InterfaceDocumentation member={member as any} params={params} />;
// 		case "classes":
// 			return <ClassDocumentation member={member as any} params={params} />;
// 		case "enums":
// 			return <EnumDocumentation member={member as any} params={params} />;
// 	}

// 	return null;
// }

/**
 * Gets the package member details
 * @param project The project documentation
 * @param input The element
 * @returns
 */
export function getPackageMember(project: ProjectParser.Json, input: string) {
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

	return <main className="px-4 [&>.markdown]:px-0 min-h-screen">{member.name}</main>;
};

export default Page;
