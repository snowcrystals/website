import "../styles/globals.css";

import type React from "react";
import Providers from "./Providers";
import { PoppinsFont } from "@website/fonts";
import { Footer } from "@website/ui";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html suppressHydrationWarning>
			<head />
			<body className="dark:bg-dark" style={PoppinsFont.style}>
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
