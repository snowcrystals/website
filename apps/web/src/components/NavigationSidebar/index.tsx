"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { ProjectParser } from "typedoc-json-parser";
import Scrollbars from "react-custom-scrollbars-2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@website/ui/select";
import { cn } from "@website/utils";
import { PropertyList } from "./PropertyList";
import { useNavigation } from "./UseNavigation";
import { PROPERTIES } from "@/lib/constants-client";

interface Props {
	/** The packages with documentation */
	packages: string[];

	/** The available documentation versions */
	versions: string[];

	/** The currently selected package */
	currentPackage: string;

	/** The currently selected version */
	currentVersion: string;

	/** The project parser data for this package */
	project: string;
}

export const NavigationSidebar: React.FC<Props> = ({ project: _project, packages, currentPackage, versions, currentVersion }) => {
	const project = JSON.parse(_project) as ProjectParser.Json;

	const { opened } = useNavigation();
	const router = useRouter();

	const gotoDocs = (docs: string) => router.push(`/docs/${docs}/main`);
	const gotoVersion = (version: string) => router.push(`/docs/${currentPackage}/${version}`);

	return (
		<nav
			className={cn(
				opened ? "block" : "hidden",
				"border rounded-lg border-muted bg-background backdrop-blur-md",
				"fixed top-24 left-4 right-4 z-10 lg:block lg:sticky max-lg:left-2 max-lg:right-2",
				"py-4 mx-auto max-w-5xl lg:h-full lg:w-[20rem] max-lg:h-[calc(100vh-112px)]"
			)}
		>
			<Scrollbars
				autoHide
				className="[&>div]:overscroll-none"
				hideTracksWhenNotNeeded
				renderThumbVertical={(props) => <div {...props} className="z-20 rounded bg-muted" />}
				renderTrackVertical={(props) => <div {...props} className="absolute bottom-0.5 right-0.5 top-0.5 z-30 w-1.5 rounded" />}
				universal
			>
				<div className="flex flex-col gap-2 mr-4 pl-4 pt-0.5">
					<Select defaultValue={currentPackage} onValueChange={gotoDocs}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							{packages.map((pkg) => (
								<SelectItem key={pkg} value={pkg}>
									{pkg}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select defaultValue={currentVersion} onValueChange={gotoVersion}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							{versions.map((version) => (
								<SelectItem key={version} value={version}>
									{version}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-4 mt-4 mr-4 pl-4">
					{PROPERTIES.filter((type) => project[type].length).map((type) => (
						<PropertyList key={type} title={type} data={project[type]} />
					))}
				</div>
			</Scrollbars>
		</nav>
	);
};
