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

const ReadmeMarkdown = ({ content, fullName, version }: Props) => {
	const options: MDXRemoteProps["options"] = {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, rehypeRaw],
			format: "md",
			remarkRehypeOptions: { allowDangerousHtml: true }
		}
	};

	return (
		<div className="max-w-prose markdown" style={InterFont.style}>
			{/* @ts-expect-error async component */}
			<MDXRemote
				source={content}
				options={options}
				// @ts-expect-error prop types not correct
				components={{ pre: SyntaxHighlighter, table: TableTag, a: (props) => <AnchorTag {...props} fullName={fullName} version={version} /> }}
			/>
		</div>
	);
};

export default ReadmeMarkdown;
