import React from "react";
import NextLink, { type LinkProps } from "next/link";

export type BaseLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;
type LinkType = React.FC<React.PropsWithChildren<BaseLinkProps>>;

export const Link: LinkType = ({ children, className, ...props }) => {
	return (
		<NextLink
			className={`${
				className ?? ""
			} border px-4 py-2 rounded-md text-5 font-medium outline outline-transparent hocus:outline-blue-500 focus:outline-[3px] transition-all`}
			{...props}
		>
			{children}
		</NextLink>
	);
};
