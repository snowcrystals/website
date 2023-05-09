import { SnowFlake } from "@website/svg";
import React from "react";

/** Background with snowflakes */
export const LandingBackground: React.FC = () => {
	return (
		<>
			{/* Left Top Snowflake */}
			<div aria-hidden className="fixed -z-1 top-0 left-0 -translate-x-96 rotate-12 scale-110 max-xl:-translate-y-80 max-sm:scale-50">
				<SnowFlake />
			</div>

			{/* Top Middle Snowflake */}
			<div aria-hidden className="fixed -z-1 top-0 right-0 -translate-y-96 -translate-x-28 scale-75 rotate-[50deg] max-xl:hidden">
				<SnowFlake />
			</div>

			{/* Right Bottom Snowflake */}
			<div aria-hidden className="fixed -z-1 bottom-0 right-0 translate-y-96 translate-x-72 -rotate-45 scale-90 max-sm:scale-75">
				<SnowFlake />
			</div>
		</>
	);
};
