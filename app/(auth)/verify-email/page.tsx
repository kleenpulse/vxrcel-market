import React, { Suspense } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import VerifyEmailPage from "./ui/verify-email";

const SuspenseWrapper = () => (
	<Suspense>
		<VerifyEmailPage />
	</Suspense>
);

export default SuspenseWrapper;
