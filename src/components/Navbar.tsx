import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import ThemeButtons from "./miscellaneous/ThemeButtons";

const Navbar = async () => {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	return (
		<nav className="bg-white dark:bg-gray-900/60 dark:backdrop-blur-xl sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white dark:bg-gray-900/0">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200 dark:border-blue-600">
						<div className="flex h-16 items-center">
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Icons.logo className="h-10 w-10" />
								</Link>
							</div>
							<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg: justify-end lg:space-x-6">
									{user ? null : (
										<Link
											href="/sign-in"
											className={buttonVariants({ variant: "ghost" })}
										>
											Sign in
										</Link>
									)}

									{user ? null : (
										<span
											className="h-6 w-px bg-gray-200 dark:bg-blue-600"
											aria-hidden
										/>
									)}

									{user ? (
										<UserAccountNav user={user} />
									) : (
										<Link
											href="/sign-up"
											className={buttonVariants({ variant: "ghost" })}
										>
											Create account
										</Link>
									)}

									{user ? (
										<span
											className="h-6 w-px bg-gray-200 dark:bg-blue-600"
											aria-hidden
										/>
									) : null}

									{user ? null : (
										<div className="flex lg:ml-6" aria-hidden>
											<span
												className="h-6 w-px bg-gray-200 dark:bg-blue-600"
												aria-hidden
											/>
										</div>
									)}

									<div className="ml flow-root lg:ml-6 ">
										<span className=" w-full flex items-center justify-center gap-x-2">
											<Cart />
											<ThemeButtons />
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</nav>
	);
};

export default Navbar;
