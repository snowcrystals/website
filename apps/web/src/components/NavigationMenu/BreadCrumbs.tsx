"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useMemo } from "react";

export const BreadCrumbs: React.FC = () => {
	const pathname = usePathname();

	const pathElements = useMemo(() => {
		const segments = pathname.split("/").slice(1);

		return segments.map((path, key, original) => (
			<Link className="rounded hover:underline" key={`${path}-${key}`} href={`/${original.slice(0, key + 1).join("/")}`}>
				{path}
			</Link>
		));
	}, [pathname]);

	const breadcrumbs = useMemo(() => {
		const flatMap = (child: React.JSX.Element, key: number, array: React.JSX.Element[]) => {
			if (key === 0) {
				return (
					<Fragment key={`${child.key}-${key}`}>
						<span className="mx-2">/</span>
						<div>{child}</div>
						<span className="mx-2">/</span>
					</Fragment>
				);
			}

			if (key !== array.length - 1) {
				return (
					<Fragment key={`${child.key}-${key}`}>
						<div>{child}</div>
						<span className="mx-2">/</span>
					</Fragment>
				);
			}

			return <div key={`${child.key}-${key}`}>{child}</div>;
		};

		return pathElements.flatMap(flatMap);
	}, [pathElements]);

	return <div className="hidden lg:flex lg:grow lg:flex-row lg:overflow-hidden">{breadcrumbs}</div>;
};
