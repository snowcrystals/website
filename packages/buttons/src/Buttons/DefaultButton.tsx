import React from "react";
import { Button, type BaseButtonProps } from "../Button";

type DefaultButtonType = React.FC<React.PropsWithChildren<BaseButtonProps>>;

export const DefaultButton: DefaultButtonType = ({ children, className, ...props }) => {
	return (
		<Button {...props} className={`${className ?? ""} bg-zinc-800 border-zinc-700`}>
			{children}
		</Button>
	);
};
