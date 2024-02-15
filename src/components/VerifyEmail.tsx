"use client";

import { trpc } from "@/lib/trpc/client";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
	const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
		token,
	});

	if (isLoading) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<LoadingSpinner />;
				<h3 className=" text-xl font-semibold animate-pulse">Verifying...</h3>
				<p className="text-muted-foreground text-sm mt-2">
					This won&apos;t take long...
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-2">
				<XCircle className="h-16 w-16 text-red-500" />
				<h3 className="text-xl font-semibold">Something went wrong</h3>
				<p className="text-muted-foreground text-sm">
					Invalid or Expired token. Please try again.
				</p>
			</div>
		);
	}

	if (data?.success) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<div className="relative mb-4 h-60 w-60 text-muted-foreground">
					<Image src="/hippo-email-sent.png" alt=" Email Sent" fill />
				</div>
				<h3 className="font-semibold text-2xl flex items-center gap-x-4">
					You&apos;re all set{" "}
					<CheckCircle className="h-10 w-10 text-green-500 brightness-150 " />
				</h3>

				<p className="text-muted-foreground text-center mt-1">
					Thank you for verifying your email.
				</p>

				<Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
					Sign in
				</Link>
			</div>
		);
	}
};

export default VerifyEmail;
