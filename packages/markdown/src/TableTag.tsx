import React from "react";

type Props = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;

const TableTag: React.FC<Props> = ({ ...props }) => {
	return (
		<div className="max-w-screen">
			<table {...props} className="w-full overflow-auto block" />
		</div>
	);
};

export default TableTag;
