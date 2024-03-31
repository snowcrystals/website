import { LinkIcon } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import React from "react";
import type { EnumMemberParser } from "typedoc-json-parser";

import { ReadmeMarkdown } from "@/components/markdown";
import { PropertyIcon } from "@/components/ui/icons/property-icon";

interface Props {
	members: EnumMemberParser.Json[];
	pkg: string;
	version: string;
}

interface EntryProps {
	member: EnumMemberParser.Json;
	pkg: string;
	version: string;
}

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap"
});

const PropertyEntry: React.FC<EntryProps> = ({ member, pkg, version }) => {
	const id = `member-${member.name.toLowerCase()}`;

	return (
		<div className="last-of-type:border-none border-b border-muted py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4 w-4" />
				</Link>
				<span>{member.name}: </span>
				<span>{member.value}</span>
			</h3>

			<div className="mt-1 [&>div.markdown]:px-0" style={jetBrainsMono.style}>
				<ReadmeMarkdown content={member.comment.description ?? ""} fullName={pkg} version={version} />
			</div>

			{member.comment.blockTags.map((tag) => (
				<div key={tag.name} className="mt-1 [&>div.markdown]:px-0">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<div className={jetBrainsMono.className}>
						<ReadmeMarkdown content={tag.text} fullName={pkg} version={version} />
					</div>
				</div>
			))}
		</div>
	);
};

export const MemberEnums: React.FC<Props> = ({ members, pkg, version }) => {
	return (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<PropertyIcon size={24} /> Properties
			</h2>

			<div className="flex flex-col gap-2">
				{members
					.sort((a, b) => {
						if (!isNaN(Number(a.value)) && !isNaN(Number(a.value))) return Number(a.value) - Number(b.value);
						if (a.value < b.value) return -1;
						if (a.value > b.value) return 1;
						return 0;
					})
					.map((member) => (
						<PropertyEntry key={member.name} member={member} pkg={pkg} version={version} />
					))}
			</div>
		</section>
	);
};
