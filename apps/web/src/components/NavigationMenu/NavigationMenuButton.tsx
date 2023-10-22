"use client";

import React from "react";
import { useNavigation } from "../NavigationSidebar/UseNavigation";
import { MenuIcon, XIcon } from "lucide-react";

export const NavMenuButton: React.FC = () => {
	const { opened, setOpened } = useNavigation();

	return (
		<button onClick={() => setOpened(!opened)} className="lg:hidden" aria-label="Toggle Menu">
			{opened ? <XIcon className="h-6" /> : <MenuIcon className="h-6" />}
		</button>
	);
};
