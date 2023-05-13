import { Code, type BrightProps } from "bright";
import type React from "react";

export const SyntaxHighlighter: React.FC<Partial<BrightProps>> = (props) => {
	return (
		<>
			<div className="hidden dark:block">
				{/* @ts-expect-error async component */}
				<Code codeClassName="font-mono" lang={props.lang ?? "ts"} {...props} theme="github-dark-dimmed" />
			</div>
			<div className="block dark:hidden [&_pre]:border [&_pre]:border-gray-300 [&_pre]:rounded-md">
				{/* @ts-expect-error async component */}
				<Code codeClassName="font-mono" lang={props.lang ?? "ts"} {...props} theme="min-light" />
			</div>
		</>
	);
};
