"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState, type Dispatch, type SetStateAction, useMemo } from "react";
import { CommandKey } from "../Icons";
import { Command } from "cmdk";
import { type JsonSearchResult, packageSearch } from "@website/doc-parser/src/Client";
import Link from "next/link";
import { getIcon } from "../Icons/PropertyIcons";

interface Props {
	/** The name of the package */
	name: string;

	/** The package version */
	version: string;
}

export const SearchModule: React.FC<Props> = ({ name, version }) => {
	const [dialog, setDialog] = useState(false);

	return (
		<>
			<div>
				<button
					onClick={() => setDialog(!dialog)}
					className="flex items-center justify-between w-3 dark:bg-markdown-dark bg-markdown-light p-2 rounded-md max-sm:w-2"
					aria-label={`Search for properties in ${name}`}
				>
					<MagnifyingGlassIcon className="h-6" /> Search...
					<div className="flex items-center gap-1 text-4 max-lg:hidden">
						<CommandKey size={18} />
						{" K"}
					</div>
				</button>
			</div>
			<CommandMenu open={dialog} setOpen={setDialog} version={version} package={name} />
			<button
				onClick={() => setDialog(false)}
				aria-hidden={!dialog}
				aria-label="Close command menu"
				className={`${dialog ? "fixed" : "hidden"} w-screen h-screen -top-[17px] -left-2 z-50 dark:bg-black/20 bg-white/20 cursor-pointer`}
			/>
		</>
	);
};

interface CommandProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;

	version: string;
	package: string;
}

const CommandMenu: React.FC<CommandProps> = ({ open, setOpen, version, package: pkg }) => {
	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				setOpen(!open);
				event.preventDefault();
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const [search, setSearch] = useState("");
	const [_search, _setSearch] = useState("");
	const [timeout, setTimeoutFn] = useState<NodeJS.Timeout>();

	const [loading, setLoading] = useState(false);
	const [rawResults, setResults] = useState<JsonSearchResult[]>([]);

	useEffect(() => {
		if (!_search) {
			setSearch("");
			return;
		}

		setLoading(true);

		const newTimeout = setTimeout(() => {
			setSearch(_search);
			setTimeoutFn(undefined);
			setLoading(false);
		}, 1e3 / 2);

		clearTimeout(timeout);
		setTimeoutFn(newTimeout);

		return () => clearTimeout(timeout);
	}, [_search]);

	useEffect(() => {
		if (search) {
			setLoading(true);
			packageSearch(pkg, version, search)
				.then((data) => setResults(data))
				.then(() => setLoading(false))
				.catch(() => setLoading(false));
		} else setResults([]);
	}, [search]);

	const results = useMemo(() => {
		return rawResults.map((result) => (
			<Command.Item key={result.id}>
				<Link href={`/docs/${pkg}/${version}/${result.name}:${result.id}`} className="flex items-center gap-2">
					{getIcon(result.propertyType ?? "typeAliases")}
					{result.name}
				</Link>
			</Command.Item>
		));
	}, [rawResults]);

	return (
		<Command.Dialog
			className="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 dark:bg-black/20 border dark:border-markdown-dark border-markdown-light rounded-md backdrop-blur-lg w-full max-w-10 max-md:max-w-6 max-sm:max-w-5"
			open={open}
			onOpenChange={setOpen}
			label="Global Command Menu"
			shouldFilter={false}
		>
			<Command.Input
				className="w-full border-0 border-b-2 rounded-t-md bg-white/30 dark:bg-black/20 dark:text-white placeholder:dark:text-white text-black placeholder:text-black/60 p-4 text-6 outline-none dark:border-markdown-dark border-markdown-light"
				placeholder={`Search for anything related to ${pkg}`}
				onValueChange={(query) => _setSearch(query)}
			/>
			<Command.List className="p-4 dark:bg-black/20">
				<Command.Empty>{loading ? "Searching..." : "No results found."}</Command.Empty>
				{results.slice(0, 10)}
			</Command.List>
		</Command.Dialog>
	);
};
