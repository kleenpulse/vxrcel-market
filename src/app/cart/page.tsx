"use client";

import { PRODUCT_CATEGORIES } from "@/components/config";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { trpc } from "@/lib/trpc/client";
import { cn, formatPrice } from "@/lib/utils";
import { Check, ImageIcon, Loader2, Shield, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import React, { useEffect, useState } from "react";

const CartPage = () => {
	const [currentColor, setcurrentColor] = useState(1);
	const { items, removeItem } = useCart();

	const router = useRouter();

	const { mutate: createCheckoutSession, isLoading } =
		trpc.payment.createSession.useMutation({
			onSuccess: ({ url }) => {
				if (url) {
					router.push(url);
				}
			},
		});

	const productIds = items.map(({ product }) => product.id);

	const cartTotal = items.reduce(
		(total, { product }) => total + product.price,
		0
	);
	const fee = 1;
	useEffect(() => {
		let intervalId = setInterval(
			() => {
				if (currentColor >= 6) {
					setcurrentColor(0);
				}
				setcurrentColor((prev) => prev + 1);
			},
			items.length ? 6000 : 10000
		);

		return () => {
			clearInterval(intervalId);
		};
	}, [currentColor, items]);

	return (
		<>
			<section
				className="w-full max-w-[1440px] mx-auto overflow-hidden hidden dark:block"
				data-cart
			>
				<div
					className={cn(
						"fixed inset-0 transition-colors delay-100 duration-1000   opacity-[0.15] ",
						{
							"bg-[#00ffbb]": currentColor === 1,
							"bg-primary": currentColor === 2,
							"bg-[#ffffff]": currentColor === 3,
							"bg-[#ffb700]": currentColor === 4,
							"bg-[#f401d0]": currentColor === 4,
							"bg-[#24f8ff]": currentColor === 5,
							"bg-[#9b3bfa]": currentColor === 6,
						}
					)}
				/>
				<div className="w-full min-h-screen fixed inset-0 z-[15] bg-gradient-to-b from-transparent  to-black" />
				<div
					className="fixed inset-0  z-10  "
					style={{
						backgroundImage: `url('/square.svg')`,
						backgroundSize: "60px",
					}}
				/>
			</section>
			<div className="mx-auto max-w-2xl px-4 pb-24 pt-16  sm:px-6 lg:max-w-7xl lg:px-8 relative z-20 ">
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl transition-colors duration-1000 lg:uppercase",
						{
							"dark:text-[#00ffbb]": currentColor === 1,
							"dark:text-primary": currentColor === 2,
							"dark:text-[#ffffff]": currentColor === 3,
							"dark:text-[#ffb700]": currentColor === 4,
							"dark:text-[#f401d0]": currentColor === 4,
							"dark:text-[#24f8ff]": currentColor === 5,
							"dark:text-[#9b3bfa]": currentColor === 6,
						}
					)}
				>
					Shopping Cart
				</h1>

				<div className="mt-12 lg:flex lg:grid-cols-2  lg:items-start lg:gap-x-12 xl:gap-x-16 ">
					<div
						className={cn("lg:col-span-7 w-full", {
							"rounded-lg border-2 border-dashed border-zinc-200 dark:border-blue-400 p-12 dark:bg-gray-950/70":
								items.length === 0,
						})}
					>
						<h2 className="sr-only">Items in your cart</h2>

						{items.length === 0 ? (
							<div className="flex h-full flex-col items-center justify-center space-y-1 ">
								<div
									className="relative mb-4 h-40 w-40 text-muted-foreground"
									aria-hidden
								>
									<Image
										src="/hippo-empty-cart.png"
										fill
										alt="Hippo Empty Cart"
										loading="eager"
									/>
								</div>
								<h3 className="text-2xl lg:font-semibold">
									Your cart is empty
								</h3>
								<p className="text-muted-foreground">
									Please add some items to your cart
								</p>
							</div>
						) : null}

						<ul className={cn("dark:bg-gray-950/50")}>
							{items.map(({ product }) => {
								const label = PRODUCT_CATEGORIES.find(
									(l) => l.value === product.category
								)?.label;
								const { image } = product.images[0];
								return (
									<li
										key={product.id}
										className={cn(
											"flex sm:items-center py-6 sm:py-10 relative last:border-b  border-t border-gray-200 dark:border-blue-700  transition-all duration-1000",
											{
												"dark:border-[#00ffbb]": currentColor === 1,
												"dark:border-primary": currentColor === 2,
												"dark:border-[#ffffff]": currentColor === 3,
												"dark:border-[#ffb700]": currentColor === 4,
												"dark:border-[#f401d0]": currentColor === 4,
												"dark:border-[#24f8ff]": currentColor === 5,
												"dark:border-[#9b3bfa]": currentColor === 6,
											}
										)}
									>
										<div className="flex-shrink-0 ">
											<div className="relative flex h-32 min-[390px]:h-40 w-32 min-[390px]:w-40  min-[450px]:h-24 min-[450px]:w-24 sm:h-48 sm:w-48">
												{typeof image !== "string" && image.url ? (
													<Image
														src={image.url}
														width={200}
														height={200}
														alt={product.name}
														className="object-cover h-full w-full rounded-md object-center  product-image"
													/>
												) : (
													<div className="flex h-full items-center justify-center bg-secondary">
														<ImageIcon
															aria-hidden
															className="h-4 w-4 text-muted-foreground"
														/>
													</div>
												)}
											</div>
										</div>
										<div className="min-[450px]:ml-4 min-[450px]:flex-row flex flex-1  h-full justify-between sm:ml-6 relative">
											<div className="relative pr-9 min-[450px]:gridx flex flex-col justify-between items-center sm:gridx sm:grid-cols-2 sm:gap-x-6 sm:pr-0 w-full h-full ml-4">
												<div className="flex flex-col gap-y-2  w-full">
													<div className="flex justify-between">
														<h3 className="text-sm">
															<Link
																href={`/products/${product.id}`}
																className="font-medium  text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-dark-link dark:text-gray-100  transition"
															>
																{product.name}
															</Link>
														</h3>
													</div>

													<div className="mt-1  text-sm">
														<p className="text-gray-500 dark:text-gray-400">
															Category: <span>{label}</span>
														</p>
													</div>

													<p className="mt-1 font-medium text-sm text-gray-900 tracking-wide dark:text-gray-100">
														{formatPrice(product.price)}
													</p>
													<p className="mt-1 flex items-center min-[450px]:space-x-2 dark:text-[#33ff8c]">
														<Check
															aria-hidden
															className="min-[450px]:h-5 h-3 min-[450px]:w-5 w-3 flex-shrink-0 dark:text-[#33ff8c] text-green-500 "
														/>
														<span className="ml-1 min-[450px]:ml-2 text-xs min-[450px]:text-sm  text-muted-foreground dark:text-[#33ff8c]   dark:border-primary lg:font-medium">
															Instant delivery!
														</span>
													</p>
													<div className="mt-1 items-center flex text-[10px] min-[410px]:text-xs min-[450px]:text-sm lg:font-medium">
														<Shield
															aria-hidden
															className="mr-1 min-[450px]:mr-2 min-[450px]:h-5 h-3 min-[450px]:w-5 w-3 text-muted-foreground dark:text-[#33ff8c]"
														/>
														<span className="text-muted-foreground dark:text-[#33ff8c]">
															30 Days Return Guarantee
														</span>
													</div>
													<Button
														size="delete"
														variant="delete"
														onClick={() => removeItem(product.id)}
														type="button"
														className="flex sm:hidden sm:justify-self-end items-center text-xs gap-x-0.5 text-rose-700  mt-2  w-full min-[450px]:max-w-[100px] py-1 md:py-1"
													>
														<X aria-hidden className="w-3 h-3" />
														Remove
													</Button>
												</div>
											</div>
										</div>
										<Button
											size="delete"
											variant="delete"
											onClick={() => removeItem(product.id)}
											type="button"
											className="sm:flex absolute top-2 right-2 hidden lg:text-sm items-center text-xs gap-x-0.5 text-rose-700  mt-2  w-full min-[450px]:max-w-[100px] py-1 md:py-1"
										>
											<X aria-hidden className="w-3 h-3" />
											Remove
										</Button>
									</li>
								);
							})}
						</ul>
					</div>
					<section
						className={cn(
							"mt-16 rounded-lg bg-gray-50 dark:bg-blue-950/60 dark:backdrop-blur-sm px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 w-full lg:sticky lg:top-16 xl:top-20 dark:border dark:border-primary",
							{
								hidden: !items.length,
							}
						)}
					>
						<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Order summary
						</h2>
						<div className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<p className="text-sm text-gray-600 dark:text-gray-300">
									Subtotal
								</p>
								<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
									{formatPrice(cartTotal)}
								</p>
							</div>

							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<p
									className="flex items-center text-sm 
							text-muted-foreground"
								>
									<span>Flat Transaction Fee</span>
								</p>
								<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
									{formatPrice(fee)}
								</div>
							</div>

							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<p className="font-medium text-gray-900 dark:text-gray-100">
									Order Total
								</p>
								<p className="font-medium text-gray-900 dark:text-gray-100">
									{formatPrice(cartTotal + fee)}
								</p>
							</div>
						</div>

						<div className="flex mt-6">
							<Button
								disabled={isLoading || !items.length}
								className="w-full dark:font-medium"
								onClick={() => createCheckoutSession({ productIds })}
							>
								{isLoading ? (
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
								) : (
									"Checkout"
								)}
							</Button>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default CartPage;
