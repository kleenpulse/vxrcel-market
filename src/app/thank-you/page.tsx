import PaymentStatus from "@/components/PaymentStatus";
import ProductListing from "@/components/ProductListing";
import { PRODUCT_CATEGORIES } from "@/components/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { MoveRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import React from "react";

interface Props {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}
const ThankYouPage = async ({ searchParams }: Props) => {
	const orderId = searchParams.orderId;
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	const payload = await getPayloadClient();

	const { docs: orders } = await payload.find({
		collection: "orders",
		depth: 2,
		where: {
			id: {
				equals: orderId,
			},
		},
	});
	const [order] = orders;

	if (!order) return notFound();

	const orderUserId =
		typeof order.user === "string" ? order.user : order.user.id;

	if (orderUserId !== user?.id) {
		return redirect(`/sign-in?origin=/thank-you?orderId=${orderId}`);
	}

	const product = order.products as Product[];
	const orderTotal = product.reduce((total, product) => {
		return total + product.price;
	}, 0);

	return (
		<div
			className="h-full lg:min-h-full relative w-full max-w-[1440px] mx-auto "
			data-cart
		>
			<div className="h-80 hidden lg:block overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12 ">
				<Image
					fill
					src="/thank-you.svg"
					alt="thank you"
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<div>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-0 lg:py-32 xl:gap-x-24">
					<div className="lg:col-start-2">
						<p className="text-sm font-medium text-blue-600 dark:text-blue-400">
							Order Successful
						</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
							Thanks for ordering
						</h1>

						{order._isPaid ? (
							<p className="mt-2 text-muted-foreground">
								Your order was processed and your payment was successful, your
								assets are available to download below, we&apos;ve sent your
								receipt to{" "}
								{typeof order.user !== "string" ? (
									<span className="font-medium text-gray-900 dark:text-gray-100">
										{order.user.email}.
									</span>
								) : null}
							</p>
						) : (
							<p className="mt-2 text-muted-foreground">
								We appreciate your order, and we&apos;ll process it as soon as
								possible. We&apos;ll email you when your order has been
								processed.
							</p>
						)}

						<div className="mt-16 text-sm font-medium">
							<p className="text-muted-foreground">Order no.</p>
							<p className="mt-2 text-gray-900 dark:text-gray-100">
								{order.id}
							</p>

							<ul className="mt-6  ">
								{(order.products as Product[]).map((product, index) => {
									const label = PRODUCT_CATEGORIES.find(
										(category) => category.value === product.category
									)?.label;

									const downloadUrl = (product.product_files as ProductFile)
										.url as string;
									const { image } = product.images[0];
									return (
										<li
											key={product.id}
											className="flex py-6 sm:py-10 relative last:border-b  border-t border-gray-200 dark:border-blue-700 text-sm space-x-6"
										>
											<div className="relative h-24 w-24">
												{typeof image !== "string" && image.url ? (
													<Image
														fill
														src={image.url}
														alt={product.name}
														className="object-cover object-center rounded-md bg-gray-50 flex-none dark:bg-blue-600/40"
													/>
												) : null}
											</div>

											<div className="flex-auto flex flex-col justify-between">
												<div className="space-y-1">
													<h3 className="text-gray-900 dark:text-gray-100">
														{product.name}
													</h3>
													<p className="my-1 text-muted-foreground">
														<span>Category: </span>
														{label}
													</p>
												</div>

												{order._isPaid ? (
													<a
														href={downloadUrl}
														download={product.name}
														className="text-blue-600 dark:text-[#36deff] hover:opacity-60 transition"
													>
														Download asset
													</a>
												) : null}
											</div>

											<p className=" flex-none font-medium text-gray-900 dark:text-gray-100">
												{formatPrice(product.price)}
											</p>
										</li>
									);
								})}
							</ul>

							<div className="space-y-6 border-t border-gray-200 dark:border-blue-700 pt-6 text-sm font-medium text-muted-foreground">
								<div className="flex justify-between">
									<p>Subtotal</p>
									<p className="text-gray-900 dark:text-gray-100">
										{formatPrice(orderTotal)}
									</p>
								</div>
								<div className="flex justify-between">
									<p>Transaction Fee</p>
									<p className="text-gray-900 dark:text-gray-100">
										{formatPrice(1)}
									</p>
								</div>

								<div className="flex items-center justify-between border-t border-gray-200 dark:border-blue-700 pt-6 ">
									<p className="text-base">Total</p>
									<p className="text-base text-gray-900 dark:text-gray-100">
										{formatPrice(orderTotal + 1)}
									</p>
								</div>
							</div>

							<PaymentStatus
								isPaid={order._isPaid}
								orderEmail={(order.user as User).email}
								orderId={order.id}
							/>

							<div className="mt-16 border-t border-gray-200 dark:border-blue-700 py-6 text-right">
								<Link
									href="/products"
									className="hidden text-sm font-medium text-blue-600 hover:text-500  dark:text-dark-link group/href md:flex items-center gap-x-2"
								>
									<span>Continue shopping</span>
									<span
										aria-hidden
										className="group-hover/href:duration-100 group-hover/href:translate-x-4 transform-gpu transition-transform duration-500 translate-x-0"
									>
										<MoveRight />
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
