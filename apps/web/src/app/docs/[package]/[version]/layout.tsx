import type React from "react";
import type { Metadata } from "next";
import { getPackageData, getPackages, getVersions } from "@website/doc-parser";
import { notFound } from "next/navigation";
import { Header, SideNavbar } from "@website/ui";

export interface PackageVersionParams {
	package: string;
	version: string;
}

export const generateMetadata = ({ params }: { params: PackageVersionParams }): Metadata => {
	return {
		title: `Snow Crystals · @snowcrystals/${params.package}: ${params.version}`
	};
};

const Layout = async ({ children, params }: React.PropsWithChildren<{ params: PackageVersionParams }>) => {
	const project = await getPackageData(params.package, params.version);
	if (!project) notFound();

	const packages = await getPackages();
	const versions = await getVersions(params.package);

	const jsonData = JSON.stringify(project.toJSON());

	return (
		<div className="mx-auto">
			<Header project={project} />
			<div className="relative top-2.5 mx-auto max-w-7xl gap-6 lg:max-w-full lg:flex">
				<div className="lg:sticky lg:top-24 lg:left-2 lg:h-[calc(100vh-20px)]">
					<SideNavbar
						project={jsonData}
						packages={packages}
						versions={versions}
						currentPackage={params.package}
						currentVersion={params.version}
					/>
				</div>
				<div className="mx-auto max-w-5xl min-w-5 w-full pb-10 pt-6">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
