import "../styles/globals.css";

import type React from "react";
import Providers from "./Providers";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

const inter = Inter({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	themeColor: "#9bbdfe",
	metadataBase: new URL("https://snowcrystals.dev"),
	title: { template: "Snow Crystals - %s", default: "Snow Crystals" },
	description: "Documentation for various npm packages built by ijsKoud"
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

				<footer className="relative z-0 grid place-items-center pb-4">
					<Link href="https://vercel.com/?utm_source=snowcrystals&utm_campaign=oss">
						<Image
							src="https://raw.githubusercontent.com/snowcrystals/.github/main/vercel.svg"
							alt="Powered by Vercel"
							width={212}
							height={44}
						/>
					</Link>
				</footer>
			</body>
		</html>
	);
};

export default RootLayout;
