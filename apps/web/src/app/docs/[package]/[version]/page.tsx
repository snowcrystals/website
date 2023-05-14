import React from "react";
import { getPackageData } from "@website/doc-parser";
import { PackageVersionParams } from "./layout";
import { ReadmeMarkdown } from "@website/markdown";

const Page = async ({ params }: { params: PackageVersionParams }) => {
	const project = (await getPackageData(params.package, params.version))!;
	const fullName = `snowcrystals/${params.package}`;

	return (
		<main>
			<ReadmeMarkdown content={project.readme ?? ""} fullName={fullName} version={params.version} />
		</main>
	);
};

export default Page;
