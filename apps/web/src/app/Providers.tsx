"use client";

import { UseNavProvider } from "@website/context";
import { ThemeProvider } from "next-themes";
import React from "react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider attribute="class">
			<UseNavProvider>{children}</UseNavProvider>
		</ThemeProvider>
	);
};

export default Providers;
