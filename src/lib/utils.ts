import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(
	price: number | string,
	options: {
		currency?: "USD" | "EUR" | "GBP" | "BDT";
		notation?: Intl.NumberFormatOptions["notation"];
	} = {}
) {
	const { currency = "USD", notation = "compact" } = options;

	const numericPrice = typeof price === "string" ? parseFloat(price) : price;
	const newPrice = new Intl.NumberFormat("en-US", {
		currency,
		notation,
		style: "currency",
		maximumFractionDigits: 2,
	}).format(numericPrice);
	return newPrice;
}

export function constructMetadata({
	title = "Vxrcel Market - the marketplace for digital assets",
	description = "Vxrcel Market is an open-source marketplace for premium digital goods.",
	image = "/thumbnail.png",
	icons = "/favicon.ico",
	noIndex = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
	noIndex?: boolean;
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@kleen_pulse",
		},
		icons,
		metadataBase: new URL("https://vxrcel-market.up.railway.app"),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}
