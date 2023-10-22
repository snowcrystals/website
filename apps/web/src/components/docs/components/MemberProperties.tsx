import React from "react";
import type { ClassPropertyParser, PropertyParser } from "typedoc-json-parser";
import Link from "next/link";
import { ReadmeMarkdown } from "@website/markdown";
import { LinkIcon } from "lucide-react";
import { getTypeParametersJsx } from "../TypeParameterParsers";
import { PropertyIcon } from "@website/ui/icons/property-icon";
import { JetBrains_Mono } from "next/font/google";

interface Props {
	properties: (PropertyParser.Json | ClassPropertyParser.Json)[];
	pkg: string;
	version: string;
}

interface EntryProps {
	property: PropertyParser.Json | ClassPropertyParser.Json;
	pkg: string;
	version: string;
}

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap"
});

const PropertyEntry: React.FC<EntryProps> = ({ property, pkg, version }) => {
	const typeValue = getTypeParametersJsx(property.type, pkg, version);
	const id = `property-${property.name.toLowerCase()}`;

	const accessibility = "accessibility" in property ? property.accessibility : "";
	const abstractFlag = "abstract" in property && property.abstract ? "abstract" : "";
	const staticFlag = "static" in property && property.static ? "static" : "";
	const flags = [staticFlag, abstractFlag, accessibility].filter(Boolean).filter((flag) => flag !== "public");

	return (
		<div className="last-of-type:border-none border-b border-muted py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4 w-4" />
				</Link>
				<span>{property.name}: </span>
				<span>{typeValue}</span>
			</h3>

			{Boolean(flags.length) && (
				<div className="flex items-center gap-2 mt-3">
					{flags.map((flag) => (
						<span key={flag} className="bg-primary rounded-full px-4 py-2">
							{flag}
						</span>
					))}
				</div>
			)}

			<div className="mt-1 [&>.markdown]:px-0" style={jetBrainsMono.style}>
				<ReadmeMarkdown content={property.comment.description ?? ""} fullName={pkg} version={version} />
			</div>

			{property.comment.blockTags.map((tag) => (
				<div key={tag.name} className="mt-1">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<div style={jetBrainsMono.style} className="[&>.markdown]:px-0">
						<ReadmeMarkdown content={tag.text} fullName={pkg} version={version} />
					</div>
				</div>
			))}
		</div>
	);
};

export const MemberProperties: React.FC<Props> = ({ properties, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<PropertyIcon size={24} /> Properties
			</h2>
			<div className="flex flex-col gap-2">
				{properties.map((property) => (
					<PropertyEntry key={property.name} property={property} pkg={pkg} version={version} />
				))}
			</div>
		</section>
	);
};
