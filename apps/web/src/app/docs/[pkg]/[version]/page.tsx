import React from "react";
import { ReadmeMarkdown } from "@website/markdown";
import { PackageVersionParams } from "./layout";
import { getPackageDocumentation } from "@/lib/docs";

const Page: React.FC<{ params: PackageVersionParams }> = async ({ params }) => {
	const project = (await getPackageDocumentation(params.pkg, params.version))!;
	const fullName = `snowcrystals/${params.pkg}`;

	return (
		<main>
			<ReadmeMarkdown content={project.readme ?? ""} fullName={fullName} version={params.version} />
		</main>
	);
};
export default Page;
