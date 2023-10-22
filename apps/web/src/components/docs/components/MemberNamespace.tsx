import React from "react";
import type { ClassParser, EnumParser, FunctionParser, InterfaceParser, NamespaceParser, TypeAliasParser, VariableParser } from "typedoc-json-parser";
import Link from "next/link";
import { getIcon } from "@/components/NavigationSidebar/PropertyIcon";
import { Button } from "@website/ui/button";

type Parser =
	| ClassParser.Json
	| FunctionParser.Json
	| EnumParser.Json
	| VariableParser.Json
	| TypeAliasParser.Json
	| InterfaceParser.Json
	| NamespaceParser.Json;

interface Props {
	properties: Parser[];
	pkg: string;
	version: string;
	type: Parameters<typeof getIcon>["0"];
}

interface EntryProps {
	property: Parser;
	pkg: string;
	version: string;
}

const PropertyEntry: React.FC<EntryProps> = ({ property, pkg, version }) => {
	return (
		<div className="last-of-type:border-none border-b border-muted py-2">
			<Button variant="link" asChild>
				<Link href={`/docs/${pkg}/${version}/${property.name}:${property.id}`}>
					<h3 className="text-4  flex items-center gap-2">
						<span>{property.name}</span>
					</h3>
				</Link>
			</Button>
		</div>
	);
};

export const MemberNamespace: React.FC<Props> = ({ properties, type, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				{getIcon(type, 24)} {type === "typeAliases" ? "types" : type}
			</h2>
			<div className="flex flex-col gap-2">
				{properties.map((property) => (
					<PropertyEntry key={property.name} property={property} pkg={pkg} version={version} />
				))}
			</div>
		</section>
	);
};
