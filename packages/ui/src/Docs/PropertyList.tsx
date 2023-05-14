"use client";

import { PlainLink } from "@website/buttons";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import type { ClassParser, EnumParser, VariableParser, TypeAliasParser, InterfaceParser, FunctionParser, NamespaceParser } from "typedoc-json-parser";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getIcon } from "../Icons/PropertyIcons";

interface Props {
	title: "classes" | "enums" | "variables" | "typeAliases" | "interfaces" | "functions" | "namespaces";
	data:
		| ClassParser.Json[]
		| EnumParser.Json[]
		| VariableParser.Json[]
		| TypeAliasParser.Json[]
		| InterfaceParser.Json[]
		| FunctionParser.Json[]
		| NamespaceParser.Json[];
}

export const PropertyList: React.FC<Props> = ({ title, data }) => {
	const pathnames = usePathname().split("/");
	const pathname = pathnames.filter((path) => !path.includes(":")).join("/");
	const icon = getIcon(title);

	const [visible, setVisible] = useState(true);

	title = (title === "typeAliases" ? "types" : title) as typeof title;

	return (
		<div>
			<button
				className="dark:bg-markdown-dark bg-markdown-light p-2 rounded-[4px] flex items-center justify-between w-full"
				onClick={() => setVisible(!visible)}
			>
				<h1 className="capitalize font-semibold text-[18px] flex items-center gap-2">
					{icon} {title}
				</h1>
				<ChevronDownIcon className={`h-6 ${visible ? "rotate-0" : "rotate-180"} transition-transform`} />
			</button>
			<ul className={`indent-5 ${visible ? "block" : "hidden"}`}>
				{data.map((parser) => (
					<li key={parser.id} className="border-zinc-700 border-l ml-4 py-1 hover:cursor-pointer hocus:dark:bg-zinc-800 hocus:bg-zinc-200">
						<PlainLink
							className="!text-4 block !w-full overflow-hidden overflow-ellipsis"
							href={`${pathname}/${parser.name}:${parser.id}`}
						>
							{parser.name}
						</PlainLink>
					</li>
				))}
			</ul>
		</div>
	);
};
