import { ReadmeMarkdown } from "@website/markdown";
import React from "react";
import { FileTextIcon } from "lucide-react";
import type { CommentParser } from "typedoc-json-parser";
import { JetBrains_Mono } from "next/font/google";

interface Props {
	comment: CommentParser.Json;
}

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap"
});

export const MemberDescription: React.FC<Props> = ({ comment }) => {
	return comment.description ? (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<FileTextIcon className="h-6 w-6" /> Description
			</h2>

			<div className="[&>div.markdown]:px-0" style={jetBrainsMono.style}>
				<ReadmeMarkdown content={comment.description} fullName="" version="" />
			</div>

			{comment.blockTags.map((tag) => (
				<div key={tag.name} className="mt-2">
					<h3 className="font-semibold text-5">{tag.name}</h3>
					<div className="[&>div.markdown]:px-0" style={jetBrainsMono.style}>
						<ReadmeMarkdown content={tag.text} fullName="" version="" />
					</div>
				</div>
			))}
		</section>
	) : null;
};
