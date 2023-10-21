import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackageDocumentation, getPackages, getVersions } from "@/lib/docs";
import { NavigationMenu } from "@/components/NavigationMenu";
import { NavigationSidebar } from "@/components/NavigationSidebar";

export interface PackageVersionParams {
	pkg: string;
	version: string;
}

export const generateMetadata = ({ params }: { params: PackageVersionParams }): Metadata => {
	return {
		title: `@snowcrystals/${params.pkg}: ${params.version}`
	};
};

const Layout = async ({ children, params }: React.PropsWithChildren<{ params: PackageVersionParams }>) => {
	const project = await getPackageDocumentation(params.pkg, params.version);
	if (!project) notFound();

	const packages = await getPackages();
	const versions = await getVersions(params.pkg);

	return (
		<div className="mx-auto">
			<NavigationMenu version={params.version} repository={params.pkg} />
			<div className="relative top-2.5 mx-auto max-w-7xl gap-6 lg:max-w-full lg:flex">
				<div className="lg:sticky lg:top-24 lg:left-2 lg:h-[calc(100vh-112px)]">
					<NavigationSidebar
						project={JSON.stringify(project)}
						packages={packages}
						versions={versions!}
						currentPackage={params.pkg}
						currentVersion={params.version}
					/>
				</div>
				<div className="mx-auto max-w-5xl min-w-5 w-full pb-10 pt-6">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
