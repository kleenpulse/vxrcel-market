"use client";

import { trpc } from "@/lib/trpc/client";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductListing from "./ProductListing";

interface Props {
	title: string;
	subtitle?: string;
	href?: string;
	query: TQueryValidator;
}
const FALLBACK_LIMIT = 4;

const ProductReel = (props: Props) => {
	const { title, subtitle, href, query } = props;

	const { data: queryResults, isLoading } =
		trpc.getInfiniteProducts.useInfiniteQuery(
			{
				limit: query.limit ?? FALLBACK_LIMIT,
				query,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextPage,
			}
		);
	const products = queryResults?.pages.flatMap((page) => page.items);

	let map: (Product | null)[] = [];

	if (products && products.length) {
		map = products;
	} else if (isLoading) {
		map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
	}

	return (
		<section className="py-12">
			<div className="md:flex md:items-center md:justify-between mb-4">
				<div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
					{title ? (
						<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
							{title}
						</h1>
					) : null}
					{subtitle ? (
						<p className="text-sm mt-2 text-muted-foreground dark:text-gray-400">
							{subtitle}
						</p>
					) : null}
				</div>

				{href ? (
					<Link
						href={href}
						className="hidden text-sm font-medium text-blue-600 hover:text-500  dark:text-dark-link group/href md:flex items-center gap-x-2"
					>
						<span>Shop the collection</span>
						<span
							aria-hidden
							className="group-hover/href:duration-100 group-hover/href:translate-x-4 transform-gpu transition-transform duration-500 translate-x-0"
						>
							<MoveRight />
						</span>
					</Link>
				) : null}
			</div>

			<div className="relative">
				<div className="mt-6 flex items-center w-full">
					<div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
						{map.map((product, idx) => (
							<ProductListing key={product?.id} index={idx} product={product} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductReel;
