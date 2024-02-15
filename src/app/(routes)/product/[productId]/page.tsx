import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/components/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
	params: { productId: string };
}

const BREADCRUMS = [
	{ id: 1, name: "Home", href: "/" },
	{ id: 2, name: "Products", href: "/products" },
];

const ProductDetails = async ({ params }: PageProps) => {
	const { productId } = params;
	const payload = await getPayloadClient();

	const { docs: products } = await payload.find({
		collection: "products",
		limit: 1,

		where: {
			id: {
				equals: productId,
			},
			approvedForSale: {
				equals: "approved",
			},
		},
	});

	const [product] = products;

	if (!product) return notFound();
	const label = PRODUCT_CATEGORIES.find(
		(category) => category.value === product.category
	)?.label;
	const validUrls = product.images
		.map(({ image }) => (typeof image === "string" ? image : image.url))
		.filter(Boolean) as string[];

	return (
		<MaxWidthWrapper>
			<div className="bg-white/70 dark:bg-gray-950/70 w-full" data-auth>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
					<div className="lg:max-w-lg lg:self-end">
						<ol className="flex items-center space-x-2">
							{BREADCRUMS.map((breadcrum, i) => (
								<li key={breadcrum.id}>
									<div className="flex items-center text-sm">
										<Link
											href={breadcrum.href}
											className="font-medium text-sm text-muted-foreground hover:text-gray-900 dark:text-dark-link dark:hover:opacity-70 transition"
										>
											{breadcrum.name}
										</Link>
										{i !== BREADCRUMS.length - 1 ? (
											<svg
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
												className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
											>
												<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
											</svg>
										) : null}
									</div>
								</li>
							))}
						</ol>

						<div className="mt-4">
							<h1 className="dark:text-gray-100 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
								{product.name}
							</h1>
						</div>

						<section className="mt-4">
							<div className="flex  items-center">
								<p className="font-medium text-gray-900 dark:text-gray-100">
									{formatPrice(product.price)}
								</p>
								<span className="ml-4 border-l text-muted-foreground border-gray-300 dark:text-gray-400 dark:border-primary pl-4">
									{label}
								</span>
							</div>

							<div className="mt-4 space-y-6">
								<p className="text-gray-500 dark:text-gray-300">
									{product.description}
								</p>
							</div>

							<div className="mt-6 flex items-center">
								<Check
									aria-hidden
									className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-[#33ff8c]"
								/>
								<span className="ml-2 text-sm  text-muted-foreground  dark:text-gray-400 dark:border-primary ">
									Instant delivery!
								</span>
							</div>
						</section>
					</div>
					{/* Product images */}
					<div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
						<div className="aspect-square rounded-lg">
							<ImageSlider urls={validUrls} />
						</div>
					</div>

					{/* Add to cart */}
					<div className="mt-10 lg:col-start-1 lg:grow-start-2 lg:max-w-lg lg:self-start ">
						<div>
							<div className="mt-10">
								<AddToCartButton product={product} />
							</div>
							<div className="mt-6 text-center">
								<div className="group inline-flex text-sm font-medium">
									<Shield
										aria-hidden
										className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-200"
									/>
									<span className="text-muted-foreground dark:text-gray-300">
										30 Days Return Guarantee
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ProductReel
				href="/products"
				query={{ category: product.category, limit: 4 }}
				title={`Similar ${label}`}
				subtitle={`Browse similar premium  ${label} just like ${product.name}`}
			/>
		</MaxWidthWrapper>
	);
};

export default ProductDetails;
