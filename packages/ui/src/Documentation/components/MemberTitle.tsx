import React from "react";
import { getIcon } from "../../Icons";
import type { iSource } from "@website/doc-parser";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type { PackageDataResult } from "@website/doc-parser/src/Client";

export interface PackageMemberParams {
	package: string;
	version: string;
	member: string;
}

interface Props {
	source: iSource | null;
	propertyType: PackageDataResult["propertyType"];
	name: string;
	params: PackageMemberParams;
}

export const MemberTitle: React.FC<Props> = ({ source, propertyType, name, params }) => {
	const sourceUrl = (source: iSource) =>
		`https://github.com/snowcrystals/${params.package}/blob/${params.version}/${source.path}/${source.file}#L${source.line}`;

	return (
		<div className="flex items-center justify-between">
			<h1 className="text-8 flex items-center gap-3 font-semibold">
				{getIcon(propertyType, 32)} {name}
			</h1>
			{source?.url && (
				<Link aria-label="Open source code" target="_blank" href={sourceUrl(source!)} className="hocus:text-primary transition-colors">
					<CodeBracketIcon className="h-6" />
				</Link>
			)}
		</div>
	);
};
