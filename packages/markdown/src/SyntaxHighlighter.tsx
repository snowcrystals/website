import { Code, type BrightProps } from "bright";
import React from "react";
import { jetBrainsMono } from "./ReadmeMarkdown";

export const SyntaxHighlighter: React.FC<Partial<BrightProps>> = (props) => {
	return (
		<React.Fragment>
			<div className="hidden dark:block">
				<Code codeClassName={jetBrainsMono.className} lang={props.lang ?? "ts"} {...props} theme="one-dark-pro" />
			</div>
			<div className="block dark:hidden [&_pre]:border [&_pre]:border-gray-300 [&_pre]:rounded-md">
				<Code codeClassName={jetBrainsMono.className} lang={props.lang ?? "ts"} {...props} theme="min-light" />
			</div>
		</React.Fragment>
	);
};
