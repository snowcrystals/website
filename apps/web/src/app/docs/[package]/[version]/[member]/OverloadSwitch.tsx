"use client";

import { SelectMenu } from "@website/ui/src/global/SelectMenu";
import React, { useMemo, useState } from "react";

interface Props {
	overloads: React.ReactNode[];
}

export const OverloadSwitch: React.FC<Props> = ({ overloads }) => {
	const [overload, setOverload] = useState(0);
	const overloadComponent = useMemo(() => overloads[overload], [overload, overloads]);

	return (
		<div>
			{overloads.length > 1 && (
				<div className="w-fit mb-4">
					<SelectMenu
						value={{ label: `Overload ${overload + 1} of ${overloads.length + 1}`, value: overload }}
						options={Array(overloads.length)
							.fill(null)
							.map((_, idx) => ({ value: idx, label: `Overload ${idx + 1}` }))}
						onChange={(value) => setOverload(value?.value ?? 0)}
					/>
				</div>
			)}
			{overloadComponent}
		</div>
	);
};
