import React from "react";

type Props = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const AnchorTag: React.FC<Props & { fullName: string; version: string }> = ({ fullName, version, href: _href, ...props }) => {
	const isGitHubLink = !_href?.startsWith("http") ?? false;
	const hasSlash = _href?.startsWith("/") ?? false;
	const href = isGitHubLink ? `https://github.com/${fullName}/blob/${version}${hasSlash ? _href : `/${_href}`}` : _href;

	return (
		<a
			{...props}
			href={href}
			target="_blank"
			rel="noopener noreferrer nofollow"
			className="text-blue-500 hocus:text-blue-400 transition-colors"
		/>
	);
};

export default AnchorTag;
