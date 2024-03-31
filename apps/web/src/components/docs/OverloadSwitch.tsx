"use client";

import React, { useMemo, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
					<Select onValueChange={(value) => setOverload(Number(value))}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							{Array(overloads.length)
								.fill(null)
								.map((_, key) => (
									<SelectItem key={key} value={`${key}`}>
										Overload ${overload + 1} of ${overloads.length}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>
			)}

			{overloadComponent}
		</div>
	);
};
