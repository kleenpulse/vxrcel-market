"use client";

import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const VerifyEmailPage = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const toEmail = searchParams.get("to");

	return (
		<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
			<Suspense>
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					{token && typeof token === "string" ? (
						<div className="grid gap-6">
							<VerifyEmail token={token} />
						</div>
					) : (
						<div className="flex h-full flex-col items-center justify-center space-y-1">
							<div className="relative mb-4 h-60 w-60 text-muted-foreground">
								<Image
									src="/hippo-email-sent.png"
									alt="Hippo Email Sent"
									fill
								/>
							</div>

							<h3 className="font-semibold text-2xl">Check your Email</h3>
							{toEmail && typeof toEmail === "string" ? (
								<p className="text-muted-foreground text-center">
									We&apos;ve sent an email to{" "}
									<span className="font-semibold">{toEmail}</span>.
								</p>
							) : (
								<p className="text-muted-foreground text-center">
									We&apos;ve sent a verification link to your email.
								</p>
							)}
						</div>
					)}
				</div>
			</Suspense>
		</div>
	);
};

export default VerifyEmailPage;
