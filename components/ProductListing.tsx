import { Product } from "@/src/payload-types";
import React, { useEffect, useState } from "react";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "./config";
import ImageSlider from "./ImageSlider";
import { useRouter } from "next/navigation";

interface Props {
	product: Product | null;
	index: number;
}
const ProductListing = ({ product, index }: Props) => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, index * 75);

		return () => clearTimeout(timer);
	}, [index]);

	if (!product || !isVisible) return <ProductSkeleton />;

	const label = PRODUCT_CATEGORIES.find(
		(category) => category.value === product.category
	)?.label;

	const validUrls = product.images
		.map(({ image }) => (typeof image === "string" ? image : image.url))
		.filter(Boolean) as string[];

	if (isVisible && product) {
		return (
			<div
				className={cn(
					"invisible h-full w-full cursor-pointer group/main relative",
					{
						"visible animate-in fade-in-5": isVisible,
					}
				)}
			>
				<div className="flex flex-col w-full">
					<ImageSlider urls={validUrls} linkId={product.id} />
					<Link
						href={`/product/${product.id}`}
						className="flex flex-col w-full"
					>
						<h3 className="mt-4 font-medium text-sm text-gray-700 dark:text-gray-200">
							{product.name}
						</h3>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{label}
						</p>
						<p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100 dark:tracking-wide">
							{formatPrice(product.price)}
						</p>
					</Link>
				</div>
			</div>
		);
	}
};

export default ProductListing;
