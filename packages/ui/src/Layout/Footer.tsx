import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
	return (
		<footer className="relative z-0 grid place-items-center pb-4">
			<Link href="https://vercel.com/?utm_source=snowcrystals&utm_campaign=oss">
				<img src="https://raw.githubusercontent.com/snowcrystals/.github/main/vercel.svg" alt="Powered by Vercel" />
			</Link>
		</footer>
	);
};
