import React from "react";
import { Button, type BaseButtonProps } from "../Button";

type PrimaryButtonType = React.FC<React.PropsWithChildren<BaseButtonProps>>;

export const PrimaryButton: PrimaryButtonType = ({ children, className, ...props }) => {
	return (
		<Button {...props} className={`${className ?? ""} bg-primary border-transparent`}>
			{children}
		</Button>
	);
};
