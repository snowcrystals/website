"use client";

import React from "react";
import Select, { type Props } from "react-select";

export const SelectMenu: React.FC<Props<{ label: string; value: any }, false>> = (props) => {
	return (
		<Select
			{...props}
			classNames={{
				input: () => "dark:text-white",
				indicatorSeparator: () => "hidden",
				control: () => "dark:!bg-markdown-dark !bg-markdown-light !border-none",
				singleValue: () => "dark:text-white",
				menu: () => "!rounded-xl",
				menuList: () => "dark:!bg-markdown-dark !bg-markdown-light rounded-[4px]",
				option: (props) =>
					`!cursor-pointer ${
						props.isSelected ? "!bg-primary" : props.isDisabled ? "dark:bg-zinc-500 bg-zinc-200" : props.isFocused ? "!bg-blue-500" : ""
					}`,
				dropdownIndicator: (props) =>
					`dark:!text-white !text-black hocus:opacity-60 !transition-all ${props.selectProps.menuIsOpen ? "rotate-180" : "rotate-0"}`
			}}
		/>
	);
};
