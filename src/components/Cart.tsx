"use client";

import React from "react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";

const Cart = () => {
	const { items } = useCart();
	const itemCount = items.length;

	const cartTotal = items.reduce(
		(total, { product }) => total + product.price,
		0
	);
	const fee = 1;

	return (
		<Sheet>
			<SheetTrigger className="group -m-2 flex items-center p-2 focus:outline-blue-400">
				<ShoppingCart
					aria-hidden
					className="h-6 w-6 flex-shrink-0 text-gray-400  group-hover:text-gray-500 dark:group-hover:text-blue-600"
				/>
				<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-blue-500">
					{itemCount}
				</span>
			</SheetTrigger>

			<SheetContent
				data-cart
				className="flex w-full flex-col pr-0 sm:max-w-lg "
			>
				<SheetHeader>Cart ({itemCount})</SheetHeader>

				{itemCount > 0 ? (
					<>
						<ScrollArea>
							<div className="flex w-full flex-col pr-6">
								{items.map(({ product }) => (
									<CartItem key={product.id} product={product} />
								))}
							</div>
						</ScrollArea>
						<div className="space-y-4 pr-6">
							<Separator className="dark:bg-blue-500" />
							<div className="space-y-1.5 text-sm">
								<div className="flex">
									<span className="flex-1 ">Shipping</span>
									<span>Free</span>
								</div>

								<div className="flex">
									<span className="flex-1 ">Transaction Fee</span>
									<span>{formatPrice(fee)}</span>
								</div>

								<div className="flex">
									<span className="flex-1 ">Total</span>
									<span>{formatPrice(cartTotal + fee)}</span>
								</div>
							</div>

							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href="/cart"
										className={buttonVariants({ className: "w-full" })}
									>
										Continue to Checkout
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-1">
						<div
							aria-hidden
							className="relative mb-4 h-60 w-60 text-muted-foreground"
						>
							<Image
								src="/hippo-empty-cart.png"
								alt="empty shopping cart"
								fill
							/>
						</div>
						<div className="text-xl font-semibold">Your cart is empty </div>
						<SheetTrigger asChild>
							<Link
								href="/products"
								className={buttonVariants({
									variant: "link",
									size: "sm",
									className: "text-sm text-muted-foreground",
								})}
							>
								Add items to your cart to checkout
							</Link>
						</SheetTrigger>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
