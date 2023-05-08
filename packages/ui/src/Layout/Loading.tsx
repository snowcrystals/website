"use client";

import { SnowflakeSpinner } from "@website/svg";
import type React from "react";

/** Loading Spinner component */
export const Loading: React.FC = () => {
	return (
		<div className="mx-4 min-h-screen flex flex-col items-center justify-center gap-4">
			<SnowflakeSpinner size={100} />
			<h1 className="text-7 font-medium">Loading...</h1>
		</div>
	);
};
