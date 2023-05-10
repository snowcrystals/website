"use client";

import { useNav } from "@website/context";
import React from "react";
import { SelectMenu } from "../global";
import { useRouter } from "next/navigation";

interface Props {
	/** The packages with documentation */
	packages: string[];

	/** The available documentation versions */
	versions: string[];

	/** The currently selected package */
	currentPackage: string;

	/** The currently selected version */
	currentVersion: string;
}

export const SideNavbar: React.FC<Props> = ({ packages, currentPackage, versions, currentVersion }) => {
	const { opened } = useNav();
	const { push } = useRouter();

	const gotoDocs = (docs?: string) => {
		if (docs) void push(`/docs/${docs}/main`);
	};

	const gotoVersion = (version?: string) => {
		if (version) void push(`/docs/${currentPackage}/${version}`);
	};

	return (
		<nav
			className={`${
				opened ? "block" : "hidden"
			} border rounded-lg dark:border-markdown-dark border-markdown-light fixed top-24 left-4 right-4 z-10 px-4 py-4 lg:block mx-auto max-w-5xl lg:w-full lg:h-full lg:sticky dark:bg-dark backdrop-blur-md lg:min-w-80`}
		>
			<div className="flex flex-col gap-2">
				<SelectMenu
					id="sidenav-package-selector"
					options={packages.map((pkg) => ({ label: pkg, value: pkg }))}
					defaultValue={{ label: `📦 ${currentPackage}`, value: currentPackage }}
					onChange={(opt) => gotoDocs(opt?.value)}
				/>
				<SelectMenu
					id="sidenav-version-selector"
					options={versions.map((version) => ({ label: version, value: version }))}
					defaultValue={{ label: `📁 ${currentVersion}`, value: currentVersion }}
					onChange={(opt) => gotoVersion(opt?.value)}
				/>
			</div>
		</nav>
	);
};
