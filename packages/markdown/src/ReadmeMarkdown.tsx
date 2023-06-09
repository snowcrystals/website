import { InterFont } from "@website/fonts";
import type React from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import AnchorTag from "./AnchorTag";
import TableTag from "./TableTag";

interface Props {
	/** The content to render */
	content: string;

	/** The full repository name
	 * @example snowcrystals/website
	 */
	fullName: string;

	/** The documentation version
	 * @example v1.0.0
	 */
	version: string;
}

export const ReadmeMarkdown = ({ content, fullName, version }: Props) => {
	const options: MDXRemoteProps["options"] = {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, rehypeRaw],
			format: "md",
			remarkRehypeOptions: { allowDangerousHtml: true }
		}
	};

	return (
		<div className="markdown px-4" style={InterFont.style}>
			<MDXRemote
				source={content}
				options={options}
				components={{
					pre: SyntaxHighlighter as any,
					table: TableTag as any,
					a: (props) => <AnchorTag {...props} fullName={fullName} version={version} />
				}}
			/>
		</div>
	);
};
