import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

const MaxWidthWrapper = ({
	className,
	children,
}: {
	className?: string | ClassValue[];
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
				className
			)}
		>
			{children}
		</div>
	);
};

export default MaxWidthWrapper;
