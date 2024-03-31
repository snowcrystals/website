"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

import { UseNavigationProvider } from "@/components/NavigationSidebar/UseNavigation";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<UseNavigationProvider>{children}</UseNavigationProvider>
		</ThemeProvider>
	);
};

export default Providers;
