import React, { Suspense } from "react";
import SignUpPageUI from "./ui/sign-up";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignUpPage = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<SignUpPageUI />
		</Suspense>
	);
};

export default SignUpPage;
