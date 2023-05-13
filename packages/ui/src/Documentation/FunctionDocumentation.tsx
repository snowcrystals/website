import React from "react";
import type { FunctionParser, SignatureParser } from "typedoc-json-parser";
import { MemberDescription, MemberParameters, MemberTitle, MemberTypeParameters, type PackageMemberParams } from "./components";

interface Props {
	overload: SignatureParser.Json;
	member: FunctionParser.Json;
	params: PackageMemberParams;
}

export const FunctionDocumentation: React.FC<Props> = ({ member, overload, params }) => {
	return (
		<div className="flex flex-col gap-4">
			<MemberTitle params={params} source={member.source} name={overload.name} propertyType={"functions"} />
			<MemberDescription comment={overload.comment} />
			<MemberTypeParameters parameters={overload.typeParameters} pkg={params.package} version={params.version} />
			<MemberParameters parameters={overload.parameters} pkg={params.package} version={params.version} />
		</div>
	);
};
