import { LandingBackground } from "@website/ui";
import { DefaultLink, PrimaryLink } from "@website/buttons";
import type React from "react";
import type { Metadata } from "next";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
	title: "Snow Crystals",
	description: "Documentation for npm packages by ijsKoud"
};

const Page: React.FC = () => {
	return (
		<>
			<LandingBackground />
			<main className="h-screen relative z-0 flex items-center justify-center flex-col">
				<div className="flex items-center justify-center w-full">
					<h1 className="text-12 font-bold w-1/2 text-center max-xl:w-3/4 max-sm:w-full">
						Documentation for npm packages by <span className="bg-primary py-1 px-2 rounded-lg">ijsKoud</span>
					</h1>
				</div>
				<div className="flex items-center justify-center gap-x-4 w-full mt-16">
					<PrimaryLink href="/docs">Docs</PrimaryLink>
					<DefaultLink href="/github" className="flex items-center gap-2">
						GitHub <ArrowTopRightOnSquareIcon className="h-6" />
					</DefaultLink>
				</div>
			</main>
		</>
	);
};

export default Page;
