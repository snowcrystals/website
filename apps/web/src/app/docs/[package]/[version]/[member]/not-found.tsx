"use client";

import { PrimaryLink } from "@website/buttons";
import { SnowFlake } from "@website/svg";
import { usePathname } from "next/navigation";

const NotFound: React.FC = () => {
	const pathnames = usePathname().split("/");
	const pathname = pathnames.slice(0, pathnames.length - 1).join("/");

	return (
		<div className="mx-auto max-w-lg min-h-screen flex flex-col place-content-center place-items-center gap-8 px-8 py-16 lg:px-6 lg:py-0">
			<h1 className="flex items-center gap-2 font-semibold leading-none text-[12rem] max-md:hidden">
				4<SnowFlake size={172} color={"#73A2FE"} />4
			</h1>
			<h1 className="md:hidden text-24 flex items-center gap-2 font-semibold leading-none">
				4<SnowFlake size={96} color={"#73A2FE"} />4
			</h1>
			<h2 className="text-9 md:text-15">Not found.</h2>
			<PrimaryLink href={pathname}>Take me back</PrimaryLink>
		</div>
	);
};

export default NotFound;
