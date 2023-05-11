"use client";

import React from "react";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useNav } from "@website/context";

export const NavMenu = () => {
	const { opened, setOpened } = useNav();

	return (
		<button onClick={() => setOpened(!opened)} className="lg:hidden" aria-label="Toggle Menu">
			{opened ? <XMarkIcon className="h-6" /> : <Bars3BottomLeftIcon className="h-6" />}
		</button>
	);
};
