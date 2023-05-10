"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import type { ClassParser, EnumParser, VariableParser, TypeAliasParser, InterfaceParser, FunctionParser, NamespaceParser } from "typedoc-json-parser";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

function getIcon(type: Props["title"]) {
	switch (type) {
		case "classes":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d="M11.34 9.71h.71l2.67-2.67v-.71L13.38 5h-.7l-1.82 1.81h-5V5.56l1.86-1.85V3l-2-2H5L1 5v.71l2 2h.71l1.14-1.15v5.79l.5.5H10v.52l1.33 1.34h.71l2.67-2.67v-.71L13.37 10h-.7l-1.86 1.85h-5v-4H10v.48l1.34 1.38zm1.69-3.65l.63.63-2 2-.63-.63 2-2zm0 5l.63.63-2 2-.63-.63 2-2zM3.35 6.65l-1.29-1.3 3.29-3.29 1.3 1.29-3.3 3.3z" />
				</svg>
			);
		case "enums":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M14 2H8L7 3v3h1V3h6v5h-4v1h4l1-1V3l-1-1zM9 6h4v1H9.41L9 6.59V6zM7 7H2L1 8v5l1 1h6l1-1V8L8 7H7zm1 6H2V8h6v5zM3 9h4v1H3V9zm0 2h4v1H3v-1zm6-7h4v1H9V4z"
					/>
				</svg>
			);
		case "functions":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d="M13.51 4l-5-3h-1l-5 3-.49.86v6l.49.85 5 3h1l5-3 .49-.85v-6L13.51 4zm-6 9.56l-4.5-2.7V5.7l4.5 2.45v5.41zM3.27 4.7l4.74-2.84 4.74 2.84-4.74 2.59L3.27 4.7zm9.74 6.16l-4.5 2.7V8.15l4.5-2.45v5.16z" />
				</svg>
			);
		case "interfaces":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d="M11.496 4a3.49 3.49 0 0 0-3.46 3h-3.1a2 2 0 1 0 0 1h3.1a3.5 3.5 0 1 0 3.46-4zm0 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
				</svg>
			);
		case "namespaces":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.199 0-.387-.038-.562-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.504 1.504 0 0 1 .765-.787c.176-.077.362-.115.558-.115H14v-.984h-.09c-.195 0-.38-.04-.556-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.414 1.414 0 0 1-.307-.465l-.001-.002a1.405 1.405 0 0 1-.117-.566c0-.29.006-.58.018-.869a6.19 6.19 0 0 0-.024-.87v-.001a3.542 3.542 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.33 2.33 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .386.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.282 2.282 0 0 0 .738.955 2.282 2.282 0 0 0-.738.955 2.7 2.7 0 0 0-.168.602c-.033.21-.051.423-.055.64-.008.22-.008.442 0 .666.008.224.012.45.012.678a1.47 1.47 0 0 1-.42 1.035 1.466 1.466 0 0 1-.457.319 1.33 1.33 0 0 1-.563.121H10z"
					/>
				</svg>
			);
		case "variables":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M2 5h2V4H1.5l-.5.5v8l.5.5H4v-1H2V5zm12.5-1H12v1h2v7h-2v1h2.5l.5-.5v-8l-.5-.5zm-2.74 2.57L12 7v2.51l-.3.45-4.5 2h-.46l-2.5-1.5-.24-.43v-2.5l.3-.46 4.5-2h.46l2.5 1.5zM5 9.71l1.5.9V9.28L5 8.38v1.33zm.58-2.15l1.45.87 3.39-1.5-1.45-.87-3.39 1.5zm1.95 3.17l3.5-1.56v-1.4l-3.5 1.55v1.41z"
					/>
				</svg>
			);
		case "typeAliases":
			return (
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d="M14.45 4.5l-5-2.5h-.9l-7 3.5-.55.89v4.5l.55.9 5 2.5h.9l7-3.5.55-.9v-4.5l-.55-.89zm-8 8.64l-4.5-2.25V7.17l4.5 2v3.97zm.5-4.8L2.29 6.23l6.66-3.34 4.67 2.34-6.67 3.11zm7 1.55l-6.5 3.25V9.21l6.5-3v3.68z" />
				</svg>
			);
	}
}

export const PropertyList: React.FC<Props> = ({ title, data }) => {
	const pathname = usePathname();
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
					<li key={parser.id} className="border-zinc-700 border-l ml-4 py-1 hover:cursor-pointer hocus:dark:bg-zinc-800">
						<Link href={`${pathname}/${parser.name}:${parser.id}`}>{parser.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
