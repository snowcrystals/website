import React from "react";
import { Link, type BaseLinkProps } from "../Link";

type PrimaryLinkType = React.FC<React.PropsWithChildren<BaseLinkProps>>;

export const PrimaryLink: PrimaryLinkType = ({ children, className, ...props }) => {
	return (
		<Link {...props} className={`${className ?? ""} bg-primary border-transparent`}>
			{children}
		</Link>
	);
};
