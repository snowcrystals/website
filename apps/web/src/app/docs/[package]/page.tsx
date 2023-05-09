import { DefaultLink } from "@website/buttons";
import type React from "react";
import type { Metadata } from "next";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import { getVersions } from "@website/doc-parser";
import { LandingBackground } from "@website/ui";

export const generateMetadata = ({ params }: { params: { package: string } }): Metadata => {
	return {
		title: `Snow Crystals · @snowcrystals/${params.package}`
	};
};

const Page = async ({ params }: { params: { package: string } }) => {
	const versions = await getVersions(params.package);

	return (
		<>
			<LandingBackground />
			<main className="h-screen relative z-0 flex items-center justify-center flex-col">
				<h1 className="text-6 font-medium mb-4">Select a version:</h1>
				<div className="flex flex-col gap-4">
					{versions.map((version) => (
						<DefaultLink key={version} href={`/docs/${params.package}/${version}`} className="w-72 flex items-center justify-between">
							{version} <ArrowSmallRightIcon className="h-8" />
						</DefaultLink>
					))}
				</div>
			</main>
		</>
	);
};

export default Page;
