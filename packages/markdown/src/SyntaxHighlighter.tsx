import { Code } from "bright";

export const SyntaxHighlighter = (props: typeof Code) => {
	return (
		<>
			<div className="hidden dark:block">
				{/* @ts-expect-error async component */}
				<Code codeClassName="font-mono" lang={props.lang ?? "typescript"} {...props} theme="github-dark-dimmed" />
			</div>
			<div className="block dark:hidden [&_pre]:border [&_pre]:border-gray-300 [&_pre]:rounded-md">
				{/* @ts-expect-error async component */}
				<Code codeClassName="font-mono" lang={props.lang ?? "typescript"} {...props} theme="min-light" />
			</div>
		</>
	);
};
