import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import PackageSelector, { Loader } from "./PackageSelector";

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

			<Button variant="default" className="mt-4" asChild>
				<Link href="/">
					<ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
				</Link>
			</Button>

			<Footer />
		</main>
	);
};

export default Page;
