import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="mt-8 grid place-items-center pb-4">
			<Link href="https://vercel.com/?utm_source=snowcrystals&utm_campaign=oss">
				<Image src="https://raw.githubusercontent.com/snowcrystals/.github/main/vercel.svg" alt="Powered by Vercel" width={212} height={44} />
			</Link>
		</footer>
	);
};

export default Footer;
