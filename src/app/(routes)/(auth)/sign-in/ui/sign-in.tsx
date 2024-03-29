"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AuthCredentialsValidator,
	TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials.validator";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { User } from "@/payload-types";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const SignInPageUI = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isSeller = searchParams.get("as") === "seller";
	const origin = searchParams.get("origin");

	const continueAsSeller = () => {
		router.push("?as=seller");
	};

	const continueAsBuyer = () => {
		router.replace("/sign-in", undefined);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	});

	const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
		onSuccess: () => {
			toast.success("Successfully signed in.");

			if (origin) {
				router.push(`/${origin}`);
				return;
			}

			if (isSeller) {
				router.push("/sell");
				return;
			}

			router.push("/");
			router.refresh();
		},

		onError: (err) => {
			if (err.data?.code === "UNAUTHORIZED") {
				toast.error("Invalid email or password");
			}
		},
	});

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		signIn({ email, password });
	};

	return (
		<>
			<div
				data-auth
				className="flex container relative pt-20 flex-col items-center justify-center lg:px-0 overflow-hidden"
			>
				<Suspense fallback={<LoadingSpinner />}>
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col items-center space-y-2 text-center">
							<Icons.logo className="h-20 w-20" />
							<h1 className="text-2xl font-bold">
								Sign in to your {isSeller ? "seller" : ""} account
							</h1>

							<Link
								className={buttonVariants({
									variant: "link",
									className: "gap-1.5",
								})}
								href="/sign-up"
							>
								Don&apos;t have an account? Sign up
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>

						<div className="grid gap-6">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="grid gap-2">
									<div className="grid gap-1 py-2">
										<Label htmlFor="email">Email</Label>
										<Input
											{...register("email")}
											placeholder="you@example.com"
											id="email"
											className={cn("dark:bg-gray-950/20", {
												"focus-visible:ring-red-500": errors.email,
											})}
										/>
										{errors?.email && (
											<p className="text-red-500 text-sm">
												{errors.email.message}
											</p>
										)}
									</div>
									<div className="grid gap-1 py-2">
										<Label htmlFor="password">Password</Label>
										<Input
											{...register("password")}
											placeholder="Password..."
											type="password"
											id="passowrd"
											className={cn("dark:bg-gray-950/20", {
												"focus-visible:ring-red-500": errors.password,
											})}
										/>
										{errors?.password && (
											<p className="text-red-500 text-sm">
												{errors.password.message}
											</p>
										)}
									</div>

									<Button>Sign in</Button>
								</div>
							</form>

							<div className=" relative">
								<div aria-hidden className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>

								<div className="relative justify-center flex text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or
									</span>
								</div>
							</div>

							{isSeller ? (
								<Button
									onClick={continueAsBuyer}
									variant={"secondary"}
									disabled={isLoading}
								>
									Continue as customer
								</Button>
							) : (
								<Button
									onClick={continueAsSeller}
									variant={"secondary"}
									disabled={isLoading}
								>
									Continue as seller
								</Button>
							)}
						</div>
					</div>
				</Suspense>
			</div>
		</>
	);
};

export default SignInPageUI;
