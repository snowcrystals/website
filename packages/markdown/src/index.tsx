import { InterFont } from "@website/fonts";
import type React from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { SyntaxHighlighter } from "./SyntaxHighlighter";

interface Props {
	children: string;

	/** The full repository name
	 * @example snowcrystals/website
	 */
	fullRepo: string;

	/** The version */
	version: string;
}

const ReadmeMarkdown = ({ children, version, fullRepo }: Props) => {
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
			<MDXRemote source={children} options={options} components={{ pre: SyntaxHighlighter }} />
		</div>
	);
};

export default ReadmeMarkdown;
