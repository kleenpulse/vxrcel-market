import { Product } from "@/src/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PRODUCT_CATEGORIES } from "./config";
import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";

const CartItem = ({ product }: { product: Product }) => {
	const { removeItem } = useCart();
	const { image } = product.images[0];
	const label = PRODUCT_CATEGORIES.find(
		(category) => category.value === product.category
	)?.label;

	return (
		<div className="space-y-3 py-2">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center space-x-4">
					<div className="relative aspect-square h-16 w-16 rounded overflow-hidden">
						{typeof image !== "string" && image.url ? (
							<Image
								src={image.url}
								alt={product.name}
								fill
								className="absolute object-cover"
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

					<div className="flex flex-col self-start">
						<span className="line-clamp-1 text-sm font-medium mb-1">
							{product.name}
						</span>
						<span className="line-clamp-1 text-xs capitalize text-muted-foreground ">
							{label}
						</span>

						<div className="mt-4  text-muted-foreground ">
							<Button
								size="delete"
								variant="delete"
								onClick={() => removeItem(product.id)}
								type="button"
								className="flex items-center text-xs gap-x-0.5 text-red-500"
							>
								<X className="w-3 h-3" />
								Remove
							</Button>
						</div>
					</div>
				</div>

				<div className="flex flex-col space-y-1 font-medium">
					<span className="ml-auto line-clamp-1 text-sm">
						{formatPrice(product.price)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
