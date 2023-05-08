import { DefaultLink } from "@website/buttons";
import type React from "react";
import type { Metadata } from "next";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { getPackages } from "@website/doc-parser";
import { LandingBackground } from "@website/ui";

export const metadata: Metadata = {
	title: "Snow Crystals",
	description: "Documentation for npm packages by ijsKoud"
};

const Page = async () => {
	const packages = await getPackages();

	return (
		<main className="h-screen relative z-0 flex items-center justify-center flex-col">
			<LandingBackground />
			<h1 className="text-6 font-medium mb-4">Select a package:</h1>
			<div className="flex flex-col gap-4">
				{packages.map((pkg) => (
					<DefaultLink key={pkg} href={`/docs/${pkg}`} className="w-72 flex items-center justify-between">
						{pkg} <ArrowSmallRightIcon className="h-8" />
					</DefaultLink>
				))}
			</div>
		</main>
	);
};

export default Page;
