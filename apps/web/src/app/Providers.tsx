"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
