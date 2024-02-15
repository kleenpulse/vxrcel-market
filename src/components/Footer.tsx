"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { authRoutes } from "@/routes";
import { usePathname } from "next/navigation";
import { Icons } from "./Icons";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const Footer = () => {
	const pathname = usePathname();
	return (
		<footer className="bg-white dark:bg-gray-950 flex-grow-0">
			<MaxWidthWrapper>
				<div className="border-t border-gray-200 dark:border-primary">
					{authRoutes.includes(pathname) ? null : (
						<div className="pb-8 pt-16">
							<div className="flex justify-center">
								<Icons.logo className="h-12 w-auto" />
							</div>
						</div>
					)}

					{authRoutes.includes(pathname) ? null : (
						<div>
							<div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
								<div className="absolute inset-0 overflow-hidden rounded-lg">
									<div
										aria-hidden
										className="absolute bg-zinc-50 dark:bg-blue-950/30 inset-0 bg-gradient-to-br bg-opacity-90"
									/>
								</div>

								<div className="text-center relative mx-auto max-w-sm">
									<h3 className="font-semibold text-gray-900 dark:text-gray-100">
										Become a seller
									</h3>
									<p className="mt-2 text-sm text-muted-foreground ">
										If you&apos;d like to sell premium quality products, you can
										do so in minutes
										<Link
											href="/sign-in?as=seller"
											className="whitespace-nowrap font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-dark-link ml-1 transition duration-300 group/href inline-flex items-center gap-x-2"
											aria-label="Get Started"
										>
											<span>Get Started</span>
											<span
												aria-hidden
												className="group-hover/href:duration-100 group-hover/href:translate-x-2 transform-gpu transition-transform duration-500 translate-x-0"
											>
												<MoveRight />
											</span>
										</Link>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="md:flex py-10 md:items-center md:justify-between">
					<div className="text-center md:text-left">
						<p className=" text-sm text-muted-foreground">
							© {new Date().getFullYear()} Vxrcel. All rights reserved.
						</p>
					</div>

					<div className="mt-4 flex items-center justify-center md:mt-0">
						<div className="flex space-x-8">
							<Link href="#" className=" text-sm text-muted-foreground">
								Terms
							</Link>
							<Link href="#" className=" text-sm text-muted-foreground">
								Privacy Policy
							</Link>
							<Link href="#" className=" text-sm text-muted-foreground">
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</MaxWidthWrapper>
		</footer>
	);
};

export default Footer;
