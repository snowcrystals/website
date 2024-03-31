import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPackages } from "@/lib/docs";

const PackageSelector: React.FC = async () => {
	const packages = await getPackages();

	return (
		<div className="flex flex-col gap-2">
			{packages.map((pkg) => (
				<Button className="w-56 flex justify-between items-center" variant="outline" key={pkg} asChild>
					<Link href={`/docs/${pkg}`}>
						{pkg} <ArrowRightIcon className="h-4 w-4" />
					</Link>
				</Button>
			))}
		</div>
	);
};

export const Loader: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			{Array(5)
				.fill(null)
				.map((_, key) => (
					<Skeleton className="w-56 h-10" key={key} />
				))}
		</div>
	);
};

export default PackageSelector;
