"use client";

import { useNav } from "@website/context";
import React from "react";
import { SelectMenu } from "../global";
import { useRouter } from "next/navigation";
import type { ProjectParser } from "typedoc-json-parser";
import { PropertyList } from "./PropertyList";
import Scrollbars from "react-custom-scrollbars-2";

interface Props {
	/** The packages with documentation */
	packages: string[];

	/** The available documentation versions */
	versions: string[];

	/** The currently selected package */
	currentPackage: string;

	/** The currently selected version */
	currentVersion: string;

	/** The project parser for this package */
	project: string;
}

const PROPERTIES = ["classes", "enums", "variables", "typeAliases", "interfaces", "functions", "namespaces"] as const;

export const SideNavbar: React.FC<Props> = ({ project: _project, packages, currentPackage, versions, currentVersion }) => {
	const { opened } = useNav();
	const { push } = useRouter();

	const gotoDocs = (docs?: string) => {
		if (docs) void push(`/docs/${docs}/main`);
	};

	const gotoVersion = (version?: string) => {
		if (version) void push(`/docs/${currentPackage}/${version}`);
	};

	const project = JSON.parse(_project) as ProjectParser.Json;

	return (
		<nav
			className={`${
				opened ? "block" : "hidden"
			} border rounded-lg dark:border-markdown-dark border-markdown-light fixed top-24 left-4 right-4 z-10 pl-4 py-4 lg:block mx-auto max-w-5xl lg:w-full lg:h-full lg:sticky dark:bg-dark backdrop-blur-md lg:min-w-5`}
		>
			<Scrollbars
				autoHide
				className="[&>div]:overscroll-none"
				hideTracksWhenNotNeeded
				renderThumbVertical={(props) => <div {...props} className="z-20 rounded bg-markdown-light dark:bg-markdown-dark" />}
				renderTrackVertical={(props) => <div {...props} className="absolute bottom-0.5 right-0.5 top-0.5 z-30 w-1.5 rounded" />}
				universal
			>
				<div className="flex flex-col gap-2 mr-4">
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
				<div className="flex flex-col gap-4 mt-4 mr-4">
					{PROPERTIES.filter((type) => project[type].length).map((type) => (
						<PropertyList key={type} title={type} data={project[type]} />
					))}
				</div>
			</Scrollbars>
		</nav>
	);
};
