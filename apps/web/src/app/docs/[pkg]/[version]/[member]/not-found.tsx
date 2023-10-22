"use client";

import { Button } from "@website/ui/button";
import { SnowFlakeIcon } from "@website/ui/snowflake-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound: React.FC = () => {
	const pathnames = usePathname().split("/");
	const pathname = pathnames.slice(0, pathnames.length - 1).join("/");

	return (
		<div className="mx-auto max-w-lg min-h-screen flex flex-col place-content-center place-items-center gap-8 px-8 py-16 lg:px-6 lg:py-0">
			<h1 className="flex items-center gap-2 font-semibold leading-none text-[12rem] max-md:hidden">
				4<SnowFlakeIcon size={172} color={"#73A2FE"} />4
			</h1>
			<h1 className="md:hidden text-24 flex items-center gap-2 font-semibold leading-none">
				4<SnowFlakeIcon size={96} color={"#73A2FE"} />4
			</h1>
			<h2 className="text-9 md:text-15">Not found.</h2>
			<Button variant="default" asChild>
				<Link href={pathname}>Take me back</Link>
			</Button>
		</div>
	);
};

export default NotFound;
