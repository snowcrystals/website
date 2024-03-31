import "../styles/globals.css";
import "../styles/markdown.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import Providers from "./Providers";

const inter = Inter({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	metadataBase: new URL("https://snowcrystals.dev"),
	title: { template: "Snow Crystals - %s", default: "Snow Crystals" },
	description: "Documentation for various npm packages built by ijsKoud"
};

export const viewport: Viewport = {
	themeColor: "#9bbdfe"
};

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
			<body className="bg-background" style={inter.style}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
