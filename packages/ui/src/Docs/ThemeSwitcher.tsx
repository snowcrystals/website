"use client";

import React from "react";
import { useTheme } from "next-themes";
import { VscodeColorMode } from "../Icons";

const ThemeSwitcher: React.FC = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const toggleTheme = () => setTheme(resolvedTheme === "light" ? "dark" : "light");

	return (
		<button onClick={toggleTheme} aria-label="Toggle theme">
			<VscodeColorMode className="[&>path]:dark:fill-current [&>path]:fill-black" size={28} />
		</button>
	);
};

export default ThemeSwitcher;
