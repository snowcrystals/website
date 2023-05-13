import React from "react";
import { PackageDataResult, getPackageMemberData } from "@website/doc-parser/src/Client";
import { PackageMemberParams } from "./layout";
import { notFound } from "next/navigation";
import {
	FunctionDocumentation,
	TypeAliasDocumentation,
	OverloadSwitch,
	VariableDocumentation,
	InterfaceDocumentation,
	ClassDocumentation
} from "@website/ui";

function getComponent(member: PackageDataResult, params: PackageMemberParams) {
	switch (member.propertyType) {
		case "functions": {
			const overloads = (member as any).signatures.map((signature: any, key: number) => (
				<FunctionDocumentation key={key} member={member as any} overload={signature} params={params} />
			));

			return <OverloadSwitch overloads={overloads} />;
		}
		case "variables":
			return <VariableDocumentation member={member as any} params={params} />;
		case "typeAliases":
			return <TypeAliasDocumentation member={member as any} params={params} />;
		case "interfaces":
			return <InterfaceDocumentation member={member as any} params={params} />;
		case "classes":
			return <ClassDocumentation member={member as any} params={params} />;
	}

	return null;
}

const Page = async ({ params }: { params: PackageMemberParams }) => {
	const member = await getPackageMemberData(params.package, params.version, params.member);
	if (!member || !member.propertyType) notFound();

	const component = getComponent(member, params);
	if (!component) notFound();

	return <main className="px-4 [&>.markdown]:px-0 min-h-screen">{component}</main>;
};

export default Page;
