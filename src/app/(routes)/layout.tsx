"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function RouteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ProgressBar
				height="4px"
				color="#0ff"
				options={{ showSpinner: false }}
				shallowRouting
			/>
			{children}
		</>
	);
}
