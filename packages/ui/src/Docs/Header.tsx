import React from "react";
import { BreadCrumbs } from "./BreadCrumbs";
import { VscodeGitHub } from "../Icons";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { SearchModule } from "./SearchModule";
import { NavMenu } from "./NavMenu";

interface Props {
	/** The name of the repository */
	repository: string;

	/** The package version */
	version: string;
}

export const Header: React.FC<Props> = ({ repository, version }) => {
	return (
		<header className="sticky top-4 z-20 border border-light-900 backdrop-blur-md mx-2 px-4 rounded-lg dark:border-markdown-dark border-markdown-light h-16">
			<div className="flex items-center justify-between h-full w-full">
				<BreadCrumbs />
				<NavMenu />
				<div className="flex items-center gap-4">
					<SearchModule name={repository} version={version} />
					<div className="flex items-center gap-4">
						<ThemeSwitcher />
						<Link
							href={`/github/${repository}`}
							aria-label="Open GitHub"
							className="hocus:outline-primary outline-2 outline outline-transparent rounded-full transition-[outline-color]"
						>
							<VscodeGitHub size={28} className="[&>path]:dark:fill-current [&>path]:fill-black" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
