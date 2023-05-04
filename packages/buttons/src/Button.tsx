import React from "react";

export type BaseButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonType = React.FC<React.PropsWithChildren<BaseButtonProps>>;

export const Button: ButtonType = ({ children, className, ...props }) => {
	return (
		<button
			className={`${
				className ?? ""
			} border px-4 py-2 rounded-md text-5 font-medium outline outline-transparent hocus:outline-blue-500 focus:outline-[3px] transition-all`}
			{...props}
		>
			{children}
		</button>
	);
};
