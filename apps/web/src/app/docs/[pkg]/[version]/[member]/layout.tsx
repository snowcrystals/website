import type { Metadata } from "next";
import React from "react";

export interface PackageMemberParams {
	pkg: string;
	version: string;
	member: string;
}

export const generateMetadata = ({ params }: { params: PackageMemberParams }): Metadata => {
	const member = decodeURIComponent(params.member).split(":")[0];

	return {
		title: `${params.pkg}@${params.version}: ${member}`
	};
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <React.Fragment>{children}</React.Fragment>;
};

export default Layout;
