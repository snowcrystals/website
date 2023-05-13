import { DocumentTextIcon } from "@heroicons/react/24/outline";
import React from "react";
import type { CommentParser } from "typedoc-json-parser";

interface Props {
	comment: CommentParser.Json;
}

export const MemberDescription: React.FC<Props> = ({ comment }) => {
	return comment.description ? (
		<section>
			<h2 className="flex items-center gap-2 text-6 font-medium">
				<DocumentTextIcon className="h-6" /> Description
			</h2>
			<p>{comment.description}</p>
			{comment.blockTags.map((tag) => (
				<div key={tag.name}>
					<h3 className="font-bold text-5">{tag.name}</h3>
					<p>{tag.text}</p>
				</div>
			))}
		</section>
	) : null;
};
