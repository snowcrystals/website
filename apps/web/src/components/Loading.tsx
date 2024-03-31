import type React from "react";

import { SnowFlakeIcon } from "@/components/ui/snowflake-icon";

/** Loading Spinner component */
export const Loading: React.FC = () => {
	return (
		<div className="mx-4 min-h-screen flex flex-col items-center justify-center gap-4">
			<SnowFlakeIcon className="animate-[spin_10s_linear_infinite]" size={100} color="#9bbdfe" />
			<h1 className="text-7 font-medium">Loading...</h1>
		</div>
	);
};
