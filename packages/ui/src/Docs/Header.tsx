import React from "react";
import type { ProjectParser } from "typedoc-json-parser";
import { BreadCrumbs } from "./BreadCrumbs";
import { VscodeGitHub } from "../Icons";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

interface Props {
	/** The project parser for this package */
	project: ProjectParser;
}

export const Header: React.FC<Props> = ({ project }) => {
	return (
		<header className="sticky top-4 z-20 border border-light-900 backdrop-blur-md mx-2 px-4 rounded-lg dark:border-markdown-dark border-markdown-light h-16">
			<div className="flex items-center justify-between h-full w-full">
				<BreadCrumbs />
				<div className="flex items-center gap-4">
					<div>Search</div>
					<div className="flex items-center gap-4">
						<ThemeSwitcher />
						<Link
							href="/github"
							aria-label="Open GitHub"
							className="hocus:outline-primary outline-1 outline outline-transparent rounded-full transition-[outline-color]"
						>
							<VscodeGitHub size={28} className="[&>path]:dark:fill-current [&>path]:fill-black" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
