import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import VersionSelector, { Loader } from "./VersionSelector";

export const metadata: Metadata = {
	title: "Version Selector"
};

const Page: React.FC<{ params: { pkg: string } }> = ({ params }) => {
	return (
		<main className="h-screen relative z-0 flex items-center justify-center flex-col">
			<h1 className="text-6 font-medium mb-4">Select a version:</h1>
			<Suspense fallback={<Loader />}>
				<VersionSelector pkg={params.pkg} />
			</Suspense>

			<Button variant="default" className="mt-4" asChild>
				<Link href="/docs">
					<ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
				</Link>
			</Button>

			<Footer />
		</main>
	);
};

export default Page;
