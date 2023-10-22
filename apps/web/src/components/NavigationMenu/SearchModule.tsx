"use client";

import React, { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@website/ui/command";
import { CommandIcon, SearchIcon } from "lucide-react";
import { Button } from "@website/ui/button";
import { PROPERTIES } from "@/lib/constants";
import type { ProjectParser } from "typedoc-json-parser";
import { useRouter } from "next/navigation";

interface Props {
	project: string;
	repository: string;
	version: string;
}

const SearchModule: React.FC<Props> = ({ project: _project, repository, version }) => {
	const project = JSON.parse(_project) as ProjectParser.Json;

	const [dialog, setDialog] = useState(false);
	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setDialog((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<div>
				<Button
					variant="secondary"
					className="flex items-center gap-4"
					aria-label={`Search for properties in ${repository}`}
					onClick={() => setDialog(!dialog)}
				>
					<SearchIcon className="h-6 w-6 mr-2" /> Search...
					<div className="flex items-center gap-0.5 text-4 max-lg:hidden">
						<CommandIcon size={18} />
						{" K"}
					</div>
				</Button>
			</div>

			<CommandMenu open={dialog} setOpen={setDialog} project={project} repository={repository} version={version} />
			<button
				onClick={() => setDialog(false)}
				aria-hidden={!dialog}
				aria-label="Close command menu"
				className={`${dialog ? "fixed" : "hidden"} w-screen h-screen -top-[17px] -left-2 z-50 dark:bg-black/20 bg-white/20 cursor-pointer`}
			/>
		</>
	);
};

interface CommandMenuProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;

	project: ProjectParser.Json;
	repository: string;
	version: string;
}

const CommandMenu: React.FC<CommandMenuProps> = ({ open, setOpen, project, repository, version }) => {
	const router = useRouter();
	const onSelect = (value: string) => {
		router.push(`/docs/${repository}/${version}/${value}`);
		setOpen(false);
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />

			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>

				{PROPERTIES.map((type) =>
					project[type].length ? (
						<CommandGroup key={type} heading={type === "typeAliases" ? "types" : type}>
							{project[type].map((parser) => (
								<CommandItem
									value={`${parser.name}:${parser.id}`}
									key={`${parser.name}:${parser.id}`}
									onSelect={onSelect}
									className="cursor-pointer"
								>
									{parser.name}
								</CommandItem>
							))}
						</CommandGroup>
					) : undefined
				)}
			</CommandList>
		</CommandDialog>
	);
};

export default SearchModule;
