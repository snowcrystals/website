import React from "react";

type ButtonType = React.FC<React.PropsWithChildren<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>>;
export const Button: ButtonType = ({ children, className, ...props }) => {
	return (
		<button
			className={`${className ?? ""} border px-4 py-2 rounded-lg text-5 outline outline-transparent hover:outline-blue-500 transition-all`}
			{...props}
		>
			{children}
		</button>
	);
};
