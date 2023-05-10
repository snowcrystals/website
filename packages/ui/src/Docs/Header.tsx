import React from "react";
import type { ProjectParser } from "typedoc-json-parser";
import { BreadCrumbs } from "./BreadCrumbs";

interface Props {
	/** The project parser for this package */
	project: ProjectParser;
}

export const Header: React.FC<Props> = ({ project }) => {
	return (
		<header className="sticky top-4 z-20 border border-light-900 backdrop-blur-md mx-2 px-4 rounded-lg dark:border-markdown-dark border-markdown-light h-16">
			<div className="flex items-center justify-between h-full w-full">
				<BreadCrumbs />
				<div>
					<div>Search</div>
					<div>buttons</div>
				</div>
			</div>
		</header>
	);
};
