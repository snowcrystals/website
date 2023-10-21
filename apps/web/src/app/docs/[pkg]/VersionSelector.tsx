import React from "react";
import { getVersions } from "@/lib/docs";
import { Skeleton } from "@website/ui/skeleton";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@website/ui/button";
import { notFound } from "next/navigation";

const VersionSelector: React.FC<{ pkg: string }> = async ({ pkg }) => {
	const versions = await getVersions(pkg);
	if (!versions) notFound();

	return (
		<div className="flex flex-col gap-2">
			{versions.map((version) => (
				<Button className="w-56 flex justify-between items-center" variant="outline" key={version} asChild>
					<Link href={`/docs/${pkg}/${version}`}>
						{version} <ArrowRightIcon className="h-4 w-4" />
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

export default VersionSelector;
