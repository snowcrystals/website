import React from "react";

interface Props {
	size: number;
	className?: string;
}

export const CommandKey: React.FC<Props> = ({ size, className }) => {
	return (
		<svg
			className={className}
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
		</svg>
	);
};
