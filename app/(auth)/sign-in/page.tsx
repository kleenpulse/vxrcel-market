import { Suspense } from "react";
import SignInPageUI from "./ui/sign-in";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignInPage = async () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<SignInPageUI />
		</Suspense>
	);
};

export default SignInPage;
