import React from "react";
import Link from "next/link";
import { SourceParser } from "typedoc-json-parser";
import { Code2Icon } from "lucide-react";
import { getIcon } from "@/components/NavigationSidebar/PropertyIcon";
import { Button } from "@website/ui/button";

interface Props {
	source: SourceParser.Json | null;
	propertyType: "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces";
	name: string;
}

export const MemberTitle: React.FC<Props> = ({ source, propertyType, name }) => {
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-8 flex items-center gap-3 font-semibold">
				{getIcon(propertyType, 32)} {name}
			</h1>

			{source?.url && (
				<Button variant="ghost" size="icon" asChild>
					<Link aria-label="Open source code" target="_blank" href={source.url}>
						<Code2Icon className="h-6 w-6" />
					</Link>
				</Button>
			)}
		</div>
	);
};
