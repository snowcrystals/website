import React from "react";
import { Link, type BaseLinkProps } from "../Link";

type PlainLinkType = React.FC<React.PropsWithChildren<BaseLinkProps>>;

export const PlainLink: PlainLinkType = ({ children, className, ...props }) => {
	return (
		<Link {...props} className={`${className ?? ""} !font-normal !p-0 !outline-none !bg-none !border-none`}>
			{children}
		</Link>
	);
};
