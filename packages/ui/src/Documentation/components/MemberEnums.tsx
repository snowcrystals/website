import React from "react";
import type { EnumMemberParser } from "typedoc-json-parser";
import { PropertyIcon } from "../../Icons";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { ReadmeMarkdown } from "@website/markdown";

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

const PropertyEntry: React.FC<EntryProps> = ({ member, pkg, version }) => {
	const id = `member-${member.name.toLowerCase()}`;

	return (
		<div className="last-of-type:border-none border-b border-markdown-light dark:border-markdown-dark py-2">
			<h3 id={id} className="text-4 font-semibold flex items-center gap-2">
				<Link href={`#${id}`}>
					<LinkIcon className="h-4" />
				</Link>
				<span>{member.name}: </span>
				<span>{member.value}</span>
			</h3>
			<div className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
				<ReadmeMarkdown content={member.comment.description ?? ""} fullName={pkg} version={version} />
			</div>
			{member.comment.blockTags.map((tag) => (
				<div key={tag.name} className="[&>div.markdown]:!font-mono mt-1 [&>div.markdown]:px-0">
					<h3 className="font-semibold text-4">{tag.name}</h3>
					<ReadmeMarkdown content={tag.text} fullName={pkg} version={version} />
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
				{members.map((member) => (
					<PropertyEntry key={member.name} member={member} pkg={pkg} version={version} />
				))}
			</div>
		</section>
	);
};
