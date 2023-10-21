import type React from "react";
import type { Metadata } from "next";
import { Button } from "@website/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import PackageSelector, { Loader } from "./PackageSelector";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Package Selector"
};

const Page: React.FC = () => {
	return (
		<main className="h-screen relative z-0 flex items-center justify-center flex-col">
			<h1 className="text-6 font-medium mb-4">Select a package:</h1>
			<Suspense fallback={<Loader />}>
				<PackageSelector />
			</Suspense>

			<Button variant="default" className="mt-4">
				<ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
			</Button>
		</main>
	);
};

export default Page;
