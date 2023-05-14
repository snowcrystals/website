import type React from "react";
import type { Metadata } from "next";

export interface PackageMemberParams {
	package: string;
	version: string;
	member: string;
}

export const generateMetadata = ({ params }: { params: PackageMemberParams }): Metadata => {
	const member = decodeURIComponent(params.member).split(":")[0];

	return {
		title: `Snow Crystals · ${params.package}@${params.version}: ${member}`
	};
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <>{children}</>;
};

export default Layout;
