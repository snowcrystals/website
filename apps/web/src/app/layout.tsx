import "../styles/globals.css";

import type React from "react";
import Providers from "./Providers";
import { PoppinsFont } from "@website/fonts";
import { Footer } from "@website/ui";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html suppressHydrationWarning>
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9bbdfe" />
				<meta name="msapplication-TileColor" content="#9bbdfe" />
				<meta name="theme-color" content="#9bbdfe" />
			</head>
			<body className="dark:bg-dark" style={PoppinsFont.style}>
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
