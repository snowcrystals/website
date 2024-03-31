import { notFound } from "next/navigation";
import React from "react";

import { ClassDocumentation } from "@/components/docs/ClassDocumentation";
import { EnumDocumentation } from "@/components/docs/EnumDocumentation";
import { FunctionDocumentation } from "@/components/docs/FunctionDocumentation";
import { InterfaceDocumentation } from "@/components/docs/InterfaceDocumentation";
import { NamespaceDocumentation } from "@/components/docs/NamespaceDocumentation";
import { OverloadSwitch } from "@/components/docs/OverloadSwitch";
import { TypeAliasDocumentation } from "@/components/docs/TypeAliasDocumentation";
import { VariableDocumentation } from "@/components/docs/VariableDocumentation";
import { getPackageDocumentation, getPackageMember } from "@/lib/docs";

import type { PackageMemberParams } from "./layout";

function getComponent(member: NonNullable<Awaited<ReturnType<typeof getPackageMember>>>, params: PackageMemberParams) {
	switch (member.propertyType) {
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

const Page: React.FC<{ params: PackageMemberParams }> = async ({ params }) => {
	const project = await getPackageDocumentation(params.pkg, params.version);
	if (!project) notFound();

	const member = await getPackageMember(params.pkg, params.version, decodeURIComponent(params.member));
	if (!member) notFound();

	const component = getComponent(member, params);
	if (!component) notFound();

	return <main className="px-4 [&>.markdown]:px-0 min-h-screen">{component}</main>;
};

export default Page;
