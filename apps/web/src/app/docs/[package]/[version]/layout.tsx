import type React from "react";
import type { Metadata } from "next";

export interface PackageVersionParams {
	package: string;
	version: string;
}

export const generateMetadata = ({ params }: { params: PackageVersionParams }): Metadata => {
	return {
		title: `Snow Crystals · @snowcrystals/${params.package}: ${params.version}`
	};
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <>{children}</>;
};

export default Layout;
