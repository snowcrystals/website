import React from "react";
import { getPackages } from "@/lib/docs";
import { Skeleton } from "@website/ui/skeleton";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@website/ui/button";

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
