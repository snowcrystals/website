import React from "react";
import { Link, type BaseLinkProps } from "../Link";

type DefaultLinkType = React.FC<React.PropsWithChildren<BaseLinkProps>>;

export const DefaultLink: DefaultLinkType = ({ children, className, ...props }) => {
	return (
		<Link {...props} className={`${className ?? ""} bg-zinc-800 border-zinc-700`}>
			{children}
		</Link>
	);
};
