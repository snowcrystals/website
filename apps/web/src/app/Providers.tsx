"use client";

import { UseNavigationProvider } from "@/components/NavigationSidebar/UseNavigation";
import { ThemeProvider } from "next-themes";
import React from "react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<UseNavigationProvider>{children}</UseNavigationProvider>
		</ThemeProvider>
	);
};

export default Providers;
