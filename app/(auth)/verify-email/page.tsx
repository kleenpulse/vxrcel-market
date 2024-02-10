import React, { Suspense } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import VerifyEmailPage from "./ui/verify-email";

interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const VerifyEmail = ({ searchParams }: PageProps) => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<VerifyEmailPage searchParams={searchParams} />
		</Suspense>
	);
};

export default VerifyEmail;
