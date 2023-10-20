import type React from "react";
import type { Metadata } from "next";
import { Button } from "@website/ui/button";
import { BookTextIcon, GithubIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Snow Crystals",
	description: "Documentation for npm packages by ijsKoud"
};

const Page: React.FC = () => {
	return (
		<main className="mt-[25vh]">
			<div className="max-w-5xl py-2 m-auto">
				<h1 className="text-16 max-lg:text-14 max-md:text-10 max-sm:text-7 font-black text-center leading-tight">
					Documentation for various npm packages built by <span className="bg-primary py-0.5 px-2 rounded-md">ijsKoud</span>.
				</h1>
			</div>

			<div className="max-w-5xl py-2 m-auto mt-8">
				<div className="flex gap-2 justify-center max-sm:flex-col max-sm:items-center">
					<Button variant="default" asChild>
						<Link href="/docs">
							<BookTextIcon className="mr-2 h-4 w-4" /> Documentation
						</Link>
					</Button>

					<Button variant="outline" asChild>
						<Link href="https://ijskoud.dev/discord">
							<MessageCircleIcon className="mr-2 h-4 w-4" /> Discord
						</Link>
					</Button>

					<Button variant="outline" asChild>
						<Link href="/github">
							<GithubIcon className="mr-2 h-4 w-4" /> GitHub
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
};

export default Page;
