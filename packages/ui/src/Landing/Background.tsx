import { SnowFlake } from "@website/svg";
import React from "react";

/** Background with snowflakes */
export const LandingBackground: React.FC = () => {
	return (
		<>
			<div aria-hidden className="fixed -z-1 top-0 left-0 -translate-x-96 rotate-12 scale-110">
				<SnowFlake />
			</div>
			<div aria-hidden className="fixed -z-1 top-0 right-0 -translate-y-96 -translate-x-28 scale-75 rotate-[50deg]">
				<SnowFlake />
			</div>
			<div aria-hidden className="fixed -z-1 bottom-0 right-0 translate-y-96 translate-x-72 -rotate-45 scale-90">
				<SnowFlake />
			</div>
		</>
	);
};
