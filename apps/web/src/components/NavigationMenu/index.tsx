import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon } from "lucide-react";
import { Button } from "@website/ui/button";
import { BreadCrumbs } from "./BreadCrumbs";

interface Props {
	/** The name of the repository */
	repository: string;

	/** The package version */
	version: string;
}

export const NavigationMenu: React.FC<Props> = ({ repository, version }) => {
	return (
		<header className="sticky top-4 z-20 border border-muted backdrop-blur-md mx-2 px-4 rounded-lg h-16">
			<div className="flex items-center justify-between h-full w-full">
				<BreadCrumbs />
				{/* <NavMenu /> */}

				<div className="flex items-center gap-4">
					{/* <SearchModule name={repository} version={version} /> */}

					<div className="flex items-center gap-1">
						<ThemeToggle />
						<Button variant="ghost" size="icon">
							<Link href={`/github/${repository}`}>
								<span className="sr-only">Open GitHub</span>
								<GithubIcon className="h-[1.2rem] w-[1.2rem]" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};
