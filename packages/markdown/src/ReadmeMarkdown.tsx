import type React from "react";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { SyntaxHighlighter } from "./SyntaxHighlighter";
import AnchorTag from "./AnchorTag";
import TableTag from "./TableTag";
import { JetBrains_Mono } from "next/font/google";

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

export const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono"
});

const MarkdownElement = MDXRemote as unknown as React.FC<MDXRemoteProps>;

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
		<div className="markdown px-4">
			<MarkdownElement
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
